-- ============================================================================
-- Student Portfolio Builder — схема базы данных Supabase
-- ============================================================================
-- Как использовать: откройте в Supabase раздел "SQL Editor" → "New query",
-- вставьте сюда весь этот файл целиком и нажмите "Run".
-- Выполнять нужно один раз, при первой настройке проекта.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. Таблица profiles — данные портфолио каждого пользователя.
--    Создаётся автоматически при регистрации (см. триггер ниже),
--    поэтому "сколько людей зарегистрировалось" = количество строк здесь.
-- ----------------------------------------------------------------------------
create table public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  username text,
  is_published boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- username должен быть уникальным (когда задан), чтобы /portfolio/username
-- всегда указывал на одного человека
create unique index profiles_username_unique_idx
  on public.profiles (username)
  where username is not null and username <> '';

create index profiles_email_idx on public.profiles (email);
create index profiles_created_at_idx on public.profiles (created_at desc);

-- ----------------------------------------------------------------------------
-- 2. Таблица events — лог действий для статистики (скачивания резюме и т.д.)
-- ----------------------------------------------------------------------------
create table public.events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users (id) on delete set null,
  portfolio_owner_id uuid references auth.users (id) on delete set null,
  event_type text not null,
  created_at timestamptz not null default now()
);

create index events_type_idx on public.events (event_type);
create index events_created_at_idx on public.events (created_at desc);
create index events_owner_idx on public.events (portfolio_owner_id);

-- ----------------------------------------------------------------------------
-- 3. Таблица admins — кто имеет доступ к /admin.
--    Администраторы могут добавлять туда других по email.
-- ----------------------------------------------------------------------------
create table public.admins (
  email text primary key,
  added_by text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 4. Функция-помощник: является ли текущий вошедший пользователь админом.
--    security definer — чтобы функция могла заглянуть в admins,
--    даже когда сама таблица admins защищена RLS.
-- ----------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admins
    where email = (auth.jwt() ->> 'email')
  );
$$;

-- ----------------------------------------------------------------------------
-- 5. Автосоздание строки profiles при регистрации нового пользователя.
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 6. Автообновление updated_at при каждом изменении профиля.
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ----------------------------------------------------------------------------
-- 7. Row Level Security — кто что может читать/писать.
-- ----------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.admins enable row level security;

-- profiles: пользователь видит свой профиль
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = user_id);

-- profiles: кто угодно (включая анонимных гостей) видит ОПУБЛИКОВАННЫЕ
-- портфолио — это то, что делает публичную страницу /portfolio/username
-- рабочей для посторонних посетителей
create policy "profiles_select_published"
  on public.profiles for select
  using (is_published = true);

-- profiles: админы видят все профили (для панели /admin)
create policy "profiles_select_admin"
  on public.profiles for select
  using (public.is_admin());

-- profiles: пользователь может обновлять только свой профиль
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- profiles: подстраховка на случай ручной вставки (обычно создаётся триггером)
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = user_id);

-- events: разрешаем вставлять события (в т.ч. анонимные, user_id может быть null)
create policy "events_insert_any"
  on public.events for insert
  with check (user_id is null or auth.uid() = user_id);

-- events: читать статистику могут только админы
create policy "events_select_admin"
  on public.events for select
  using (public.is_admin());

-- admins: список видят только сами админы
create policy "admins_select_admin"
  on public.admins for select
  using (public.is_admin());

-- admins: добавлять новых админов могут только существующие админы
create policy "admins_insert_admin"
  on public.admins for insert
  with check (public.is_admin());

-- admins: удалять админов могут только существующие админы
create policy "admins_delete_admin"
  on public.admins for delete
  using (public.is_admin());

-- ============================================================================
-- 8. САМОЕ ВАЖНОЕ: первый администратор.
-- Без этой строки некому будет заходить в /admin и добавлять остальных —
-- политики выше требуют "уже быть админом", чтобы добавить нового.
-- Замените email на свой Gmail (тот, которым будете входить на сайт),
-- и выполните ЭТУ строку отдельно (или вместе со всем файлом — без разницы).
-- ============================================================================
insert into public.admins (email, added_by)
values ('ваш-email@gmail.com', 'bootstrap');
