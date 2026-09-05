-- ============================================================================
-- Миграция: хранилище для загрузки фото профиля с устройства.
-- Выполнить один раз в Supabase → SQL Editor → New query → Run.
-- ============================================================================

-- Публичный бакет — фото должны быть видны всем посетителям опубликованного
-- портфолио, не только владельцу.
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Смотреть фото может кто угодно (иначе они не отобразятся на публичном
-- портфолио для посторонних посетителей).
create policy "avatars_public_read"
on storage.objects for select
using (bucket_id = 'avatars');

-- Загружать/менять/удалять можно только внутри СВОЕЙ папки — путь файла
-- обязан начинаться с user_id загружающего (см. код: `${userId}/photo...`),
-- иначе загрузка отклоняется. Это не даёт одному пользователю перезаписать
-- или удалить чужое фото.
create policy "avatars_own_folder_insert"
on storage.objects for insert
with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "avatars_own_folder_update"
on storage.objects for update
using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "avatars_own_folder_delete"
on storage.objects for delete
using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
