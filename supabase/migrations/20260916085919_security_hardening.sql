-- VoteLab security hardening.
-- Run this migration against the VoteLab Supabase project before deploying the matching application files.

create table if not exists public.public_ballots (
  id uuid primary key default gen_random_uuid(),
  election_id uuid not null references public.elections(id) on delete cascade,
  ballot_nonce text not null,
  created_at timestamptz not null default now(),
  unique (election_id, ballot_nonce)
);

create table if not exists public.rate_limit_buckets (
  key text primary key,
  window_started_at timestamptz not null,
  request_count integer not null default 0
);

alter table public.public_ballots enable row level security;
alter table public.rate_limit_buckets enable row level security;
alter table public.election_registration_fields enable row level security;
alter table public.election_registration_settings enable row level security;
alter table public.election_settings enable row level security;
alter table public.eletion_registrations enable row level security;
alter table public.voters enable row level security;
alter table public.votes enable row level security;
alter table public.votes add column if not exists ballot_nonce text;

-- Remove the existing broad policies before rebuilding least-privilege policies.
do $$
declare r record;
begin
  for r in select schemaname, tablename, policyname from pg_policies where schemaname = 'public' and tablename in (
    'election_categories','elections','nominees','organizations','profiles','voter_tokens','election_registration_fields',
    'election_registration_settings','election_settings','eletion_registrations','voters','votes','public_ballots','rate_limit_buckets'
  ) loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

-- Public election discovery is read-only and limited to published elections.
create policy "anon can view published elections"
on public.elections for select to anon
using (is_published = true);

create policy "authenticated owners can view their elections"
on public.elections for select to authenticated
using (
  exists (select 1 from public.organizations o where o.id = elections.organization_id and o.owner_id = (select auth.uid()))
);

create policy "authenticated owners can create elections"
on public.elections for insert to authenticated
with check (
  exists (select 1 from public.organizations o where o.id = elections.organization_id and o.owner_id = (select auth.uid()))
);

create policy "authenticated owners can update elections"
on public.elections for update to authenticated
using (exists (select 1 from public.organizations o where o.id = elections.organization_id and o.owner_id = (select auth.uid())))
with check (exists (select 1 from public.organizations o where o.id = elections.organization_id and o.owner_id = (select auth.uid())));

create policy "authenticated owners can delete elections"
on public.elections for delete to authenticated
using (exists (select 1 from public.organizations o where o.id = elections.organization_id and o.owner_id = (select auth.uid())));

-- Published election categories and nominees are public ballot content.
create policy "anon can view published election categories"
on public.election_categories for select to anon
using (exists (select 1 from public.elections e where e.id = election_categories.election_id and e.is_published = true));

create policy "authenticated owners can manage categories"
on public.election_categories for all to authenticated
using (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_categories.election_id and o.owner_id = (select auth.uid())))
with check (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_categories.election_id and o.owner_id = (select auth.uid())));

create policy "anon can view published nominees"
on public.nominees for select to anon
using (exists (select 1 from public.election_categories c join public.elections e on e.id = c.election_id where c.id = nominees.category_id and e.is_published = true));

create policy "authenticated owners can manage nominees"
on public.nominees for all to authenticated
using (exists (select 1 from public.election_categories c join public.elections e on e.id = c.election_id join public.organizations o on o.id = e.organization_id where c.id = nominees.category_id and o.owner_id = (select auth.uid())))
with check (exists (select 1 from public.election_categories c join public.elections e on e.id = c.election_id join public.organizations o on o.id = e.organization_id where c.id = nominees.category_id and o.owner_id = (select auth.uid())));

-- Organisation name/logo is public only when attached to a published election.
create policy "anon can view public election organizations"
on public.organizations for select to anon
using (exists (select 1 from public.elections e where e.organization_id = organizations.id and e.is_published = true));

create policy "authenticated owners can view organizations"
on public.organizations for select to authenticated
using (owner_id = (select auth.uid()));

create policy "authenticated users can create organizations"
on public.organizations for insert to authenticated
with check (owner_id = (select auth.uid()));

create policy "authenticated owners can update organizations"
on public.organizations for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

create policy "authenticated owners can delete organizations"
on public.organizations for delete to authenticated
using (owner_id = (select auth.uid()));

-- Registration settings: only the public ballot configuration is readable anonymously.
create policy "anon can view published election settings"
on public.election_settings for select to anon
using (exists (select 1 from public.elections e where e.id = election_settings.election_id and e.is_published = true));

create policy "authenticated owners can manage election settings"
on public.election_settings for all to authenticated
using (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_settings.election_id and o.owner_id = (select auth.uid())))
with check (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_settings.election_id and o.owner_id = (select auth.uid())));

create policy "anon can view published registration settings"
on public.election_registration_settings for select to anon
using (exists (select 1 from public.elections e where e.id = election_registration_settings.election_id and e.is_published = true));

create policy "authenticated owners can manage registration settings"
on public.election_registration_settings for all to authenticated
using (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_registration_settings.election_id and o.owner_id = (select auth.uid())))
with check (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_registration_settings.election_id and o.owner_id = (select auth.uid())));

create policy "anon can view published registration fields"
on public.election_registration_fields for select to anon
using (exists (select 1 from public.elections e where e.id = election_registration_fields.election_id and e.is_published = true));

create policy "authenticated owners can manage registration fields"
on public.election_registration_fields for all to authenticated
using (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_registration_fields.election_id and o.owner_id = (select auth.uid())))
with check (exists (select 1 from public.elections e join public.organizations o on o.id = e.organization_id where e.id = election_registration_fields.election_id and o.owner_id = (select auth.uid())));

-- Profiles remain private to the owner.
create policy "users can view own profile" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "users can update own profile" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Voter records, token records and votes are server-only. The matching application now uses the secret-key client for these operations.
-- No anon/authenticated policies are created for these tables.

revoke all on public.voters from anon, authenticated;
revoke all on public.voter_tokens from anon, authenticated;
revoke all on public.votes from anon, authenticated;
revoke all on public.eletion_registrations from anon, authenticated;
revoke all on public.public_ballots from anon, authenticated;
revoke all on public.rate_limit_buckets from anon, authenticated;

-- Remove direct DML from browser roles on election-management tables; the authenticated policies above still authorise the needed owner operations.
revoke insert, update, delete on public.election_categories from anon;
revoke insert, update, delete on public.nominees from anon;
revoke insert, update, delete on public.elections from anon;
revoke insert, update, delete on public.organizations from anon;
revoke insert, update, delete on public.election_settings from anon;
revoke insert, update, delete on public.election_registration_settings from anon;
revoke insert, update, delete on public.election_registration_fields from anon;

-- Atomic rate limiter. This function is callable only by the server secret-key role.
create or replace function public.consume_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  now_ts timestamptz := clock_timestamp();
  row_data public.rate_limit_buckets%rowtype;
begin
  if p_limit < 1 or p_window_seconds < 1 then return false; end if;

  insert into public.rate_limit_buckets(key, window_started_at, request_count)
  values (left(p_key, 200), now_ts, 1)
  on conflict (key) do update
    set request_count = case
      when public.rate_limit_buckets.window_started_at <= now_ts - make_interval(secs => p_window_seconds)
        then 1
      else public.rate_limit_buckets.request_count + 1
    end,
    window_started_at = case
      when public.rate_limit_buckets.window_started_at <= now_ts - make_interval(secs => p_window_seconds)
        then now_ts
      else public.rate_limit_buckets.window_started_at
    end
  returning * into row_data;

  return row_data.request_count <= p_limit;
end;
$$;

revoke all on function public.consume_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, integer, integer) to service_role;

-- Atomic secure ballot submission.
create or replace function public.submit_secure_ballot(
  p_election_id uuid,
  p_voter_id uuid,
  p_token_id uuid,
  p_votes jsonb
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  election_row public.elections%rowtype;
  token_row public.voter_tokens%rowtype;
  item jsonb;
  category_id uuid;
  nominee_id uuid;
  submitted_count integer;
  valid_count integer;
begin
  select * into election_row from public.elections where id = p_election_id for update;
  if not found or not election_row.is_published or election_row.status not in ('published','active') then raise exception 'Election is not open'; end if;
  if election_row.start_date > now() then raise exception 'Election is not open'; end if;
  if election_row.end_date <= now() then raise exception 'Election ended'; end if;

  select * into token_row from public.voter_tokens where id = p_token_id and election_id = p_election_id and voter_id = p_voter_id for update;
  if not found or token_row.used then raise exception 'Invalid voting token'; end if;
  if token_row.expires_at is not null and token_row.expires_at <= now() then raise exception 'Invalid voting token'; end if;

  if exists (select 1 from public.votes where election_id = p_election_id and voter_id = p_voter_id) then raise exception 'Already voted'; end if;

  submitted_count := jsonb_array_length(p_votes);
  if submitted_count < 1 then raise exception 'Invalid ballot'; end if;

  select count(*) into valid_count
  from jsonb_to_recordset(p_votes) as v(category_id uuid, nominee_id uuid)
  join public.election_categories c on c.id = v.category_id and c.election_id = p_election_id
  join public.nominees n on n.id = v.nominee_id and n.category_id = c.id;
  if valid_count <> submitted_count then raise exception 'Invalid ballot'; end if;
  if (select count(distinct (v->>'category_id')) from jsonb_array_elements(p_votes) v) <> submitted_count then raise exception 'Invalid ballot'; end if;

  for item in select * from jsonb_array_elements(p_votes) loop
    category_id := (item->>'category_id')::uuid;
    nominee_id := (item->>'nominee_id')::uuid;
    insert into public.votes(election_id, category_id, nominee_id, voter_id, ballot_nonce) values (p_election_id, category_id, nominee_id, p_voter_id, null);
  end loop;

  update public.voter_tokens set used = true, used_at = now() where id = p_token_id;
end;
$$;

-- Atomic public ballot submission. Public voting is intentionally open-access; the signed browser ballot nonce prevents accidental duplicate submissions from the same browser, but it is not an identity-based one-person-one-vote guarantee.
create or replace function public.submit_public_ballot(
  p_election_id uuid,
  p_ballot_nonce text,
  p_votes jsonb
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  election_row public.elections%rowtype;
  item jsonb;
  category_id uuid;
  nominee_id uuid;
  submitted_count integer;
  valid_count integer;
begin
  if length(p_ballot_nonce) < 16 then raise exception 'Invalid ballot'; end if;
  select * into election_row from public.elections where id = p_election_id for update;
  if not found or not election_row.is_published or election_row.status not in ('published','active') then raise exception 'Election is not open'; end if;
  if election_row.start_date > now() then raise exception 'Election is not open'; end if;
  if election_row.end_date <= now() then raise exception 'Election ended'; end if;

  insert into public.public_ballots(election_id, ballot_nonce) values (p_election_id, p_ballot_nonce);

  submitted_count := jsonb_array_length(p_votes);
  if submitted_count < 1 then raise exception 'Invalid ballot'; end if;

  select count(*) into valid_count
  from jsonb_to_recordset(p_votes) as v(category_id uuid, nominee_id uuid)
  join public.election_categories c on c.id = v.category_id and c.election_id = p_election_id
  join public.nominees n on n.id = v.nominee_id and n.category_id = c.id;
  if valid_count <> submitted_count then raise exception 'Invalid ballot'; end if;
  if (select count(distinct (v->>'category_id')) from jsonb_array_elements(p_votes) v) <> submitted_count then raise exception 'Invalid ballot'; end if;

  for item in select * from jsonb_array_elements(p_votes) loop
    category_id := (item->>'category_id')::uuid;
    nominee_id := (item->>'nominee_id')::uuid;
    insert into public.votes(election_id, category_id, nominee_id, voter_id, ballot_nonce) values (p_election_id, category_id, nominee_id, null, p_ballot_nonce);
  end loop;
end;
$$;

revoke all on function public.submit_secure_ballot(uuid, uuid, uuid, jsonb) from public, anon, authenticated;
revoke all on function public.submit_public_ballot(uuid, text, jsonb) from public, anon, authenticated;
grant execute on function public.submit_secure_ballot(uuid, uuid, uuid, jsonb) to service_role;
grant execute on function public.submit_public_ballot(uuid, text, jsonb) to service_role;


create unique index if not exists votes_secure_voter_category_unique
on public.votes(election_id, voter_id, category_id)
where voter_id is not null;

create index if not exists votes_election_id_idx on public.votes(election_id);
create index if not exists voter_tokens_election_token_idx on public.voter_tokens(election_id, token);
create index if not exists voters_election_id_idx on public.voters(election_id);
create index if not exists election_categories_election_id_idx on public.election_categories(election_id);
create index if not exists nominees_category_id_idx on public.nominees(category_id);

-- Ensure service_role retains server-side access after browser grants are reduced.
grant all on public.voters, public.voter_tokens, public.votes, public.public_ballots, public.rate_limit_buckets to service_role;
grant execute on function public.submit_secure_ballot(uuid, uuid, uuid, jsonb) to service_role;
grant execute on function public.submit_public_ballot(uuid, text, jsonb) to service_role;
grant execute on function public.consume_rate_limit(text, integer, integer) to service_role;
