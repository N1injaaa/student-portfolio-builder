-- ============================================================================
-- Миграция: аналитика просмотров портфолио (для Pro-аккаунтов).
-- Выполнить один раз в Supabase → SQL Editor → New query → Run.
-- ============================================================================

-- Функция для владельца портфолио — возвращает КОЛИЧЕСТВО просмотров и
-- скачиваний резюме именно ЕГО портфолио. security definer — чтобы можно
-- было безопасно посчитать сумму по таблице events, не открывая всем
-- пользователям прямой SELECT на неё (там же лежат события всех аккаунтов).
-- auth.uid() внутри функции гарантирует, что каждый видит статистику
-- только по себе — подменить чужой id снаружи невозможно.
create or replace function public.get_my_portfolio_stats()
returns table (view_count bigint, download_count bigint)
language sql
security definer
set search_path = public
as $$
  select
    count(*) filter (where event_type = 'portfolio_viewed') as view_count,
    count(*) filter (where event_type = 'resume_downloaded') as download_count
  from public.events
  where portfolio_owner_id = auth.uid();
$$;

grant execute on function public.get_my_portfolio_stats() to authenticated;
