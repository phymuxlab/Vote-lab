-- Backfill settings for elections created before voting_mode was exposed in the UI.
-- Existing elections without settings are treated as Public Voting because their
-- prior flow did not require voter registration tokens.
insert into public.election_settings (
  election_id,
  voting_mode,
  require_name,
  require_email,
  require_phone,
  require_student_id,
  require_employee_id,
  require_national_id,
  unique_identifier
)
select
  e.id,
  'public',
  true,
  true,
  false,
  false,
  false,
  false,
  'email'
from public.elections e
left join public.election_settings s on s.election_id = e.id
where s.id is null;

create index if not exists election_settings_election_id_idx
  on public.election_settings(election_id);
