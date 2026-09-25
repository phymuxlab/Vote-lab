# Vote Lab — update notes

This folder is the complete project supplied for the Vote Lab work, with the security, routing, voting-flow and UI fixes applied on top.

## Main fixes

- Election creation now uses the organiser's selected **Public Voting** or **Secure Voting** mode and saves it in `election_settings.voting_mode`.
- The create-election route now renders the real election form instead of the old route-test placeholder.
- Invalid organisation-level Categories/Nominees/Results links were removed from organisation navigation; those resources are managed inside an election.
- Legacy `/vote/...` election routes now redirect to the canonical `/elections/...` flow.
- Removed the debug `/test` page and an unused auth helper file.
- Fixed UI import casing so Linux/CI builds use the actual lowercase `button`, `input`, `label`, `textarea` and `card` filenames.
- Replaced fake testimonials with factual product workflow content.
- Added Privacy, Terms, Cookies, Refund and Accessibility pages.
- Added `.env.example` and production/security documentation.
- Removed client/server debug logging from the voting flow.
- Added server-side input validation, rate limiting and owner checks to organiser actions.
- Sensitive voter, token and vote operations use the server-only Supabase client.
- Secure voting sessions are signed and use strict, HttpOnly cookies.
- Public ballot sessions use a signed browser nonce and an atomic database submission function.
- Secure and public ballot submission are validated atomically in Postgres.
- Added/verified RLS, Data API privilege restrictions and server-only RPC execution for sensitive voting tables.
- Election settings were backfilled for legacy elections without settings. Existing elections without a configured mode were treated as Public Voting; the existing `Governor Election 2027` secure mode was preserved.
- Organisation asset uploads now use organisation-specific storage paths and an owner-restricted storage policy.
- Upload filenames are generated server-side rather than using user-provided filenames.
- Removed the remote Google font dependency from the root layout to make local builds less dependent on external font fetching.
- Added security response headers and disabled the Next.js powered-by header.
- Added a source security scan and package-lock audit command.

## Verification performed

- TypeScript source syntax parsing: passed.
- Local import-path existence scan: passed.
- UI import casing scan: passed.
- JSON configuration parsing: passed.
- Package-lock root dependency synchronisation: passed.
- Source security scan: passed.
- `npm audit --package-lock-only --audit-level=high --offline`: reported 0 vulnerabilities using the available local audit data.
- Supabase RLS, sensitive-table grants, voting RPCs, election settings and storage policies were inspected against the configured Vote Lab project.

## Important final test

The full dependency installation/build could not be executed in this environment because the npm registry was not reachable. After extracting this project on your computer, run:

```bash
npm install
npm run lint
npm run build
npm run dev
```

Then test both voting systems end-to-end before using a live election.
