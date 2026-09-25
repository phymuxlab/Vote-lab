-- Follow-up migration: all public election data is now read by trusted server code.
do $$
declare r record;
begin
  for r in select schemaname, tablename, policyname from pg_policies where schemaname='public' and roles @> array['anon']::name[] loop
    execute format('drop policy if exists %I on %I.%I', r.policyname, r.schemaname, r.tablename);
  end loop;
end $$;

revoke all on table public.elections, public.election_categories, public.nominees, public.organizations,
  public.election_settings, public.election_registration_settings, public.election_registration_fields,
  public.profiles, public.eletion_registrations, public.voters, public.voter_tokens, public.votes,
  public.public_ballots, public.rate_limit_buckets from anon;

revoke all on table public.elections, public.election_categories, public.nominees, public.organizations,
  public.election_settings, public.election_registration_settings, public.election_registration_fields,
  public.profiles, public.eletion_registrations, public.voters, public.voter_tokens, public.votes,
  public.public_ballots, public.rate_limit_buckets from public;
