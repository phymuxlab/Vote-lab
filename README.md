# Vote Lab

Vote Lab is a responsive digital voting platform for campus elections, awards, clubs and organisational polls.

## Voting systems

- **Public Voting** — voters open the published election and go directly to the ballot. A signed browser ballot nonce helps prevent accidental duplicate submissions from the same browser; it is not an identity-based one-person-one-vote guarantee.
- **Secure Voting** — voters register with the fields configured by the organiser, receive an 8-character one-time token, verify it, and then access the ballot.

## Requirements

- Node.js 20+
- npm 10+
- A Supabase project configured for the included application schema/migrations

## Environment

Copy `.env.example` to `.env.local` and fill in the real values. Never expose `SUPABASE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `VOTELAB_SESSION_SECRET` to the browser and never commit them.

Required:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
VOTELAB_SESSION_SECRET=
```

The legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` names are supported as fallbacks.

Before production, replace the business-detail placeholders in the environment variables used by the legal pages.

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run check:imports
npm run lint
npm run build
npm run security:audit
```

`security:audit` runs the source scan and npm audit. An online npm audit should be run again before production deployment because vulnerability databases change.

## Supabase

The project includes migrations under `supabase/migrations/`. The security migrations move sensitive voter/token/vote operations behind server-side access and database functions, add rate limiting, and add atomic ballot submission functions.

Do not run an included migration a second time against a database where the same migration has already been applied. Review the migration history in Supabase first.

## Production checklist

1. Configure real business/legal contact details.
2. Configure the Supabase public and server-only keys in the hosting environment.
3. Confirm the `organization-assets` storage bucket and its policies.
4. Apply and verify the Supabase migrations.
5. Create a test organisation and run both Public Voting and Secure Voting end-to-end.
6. Verify the organiser can access only their own organisation/elections.
7. Test the published election on mobile and desktop.
8. Run lint, build and npm audit before launch.
9. Review the Privacy, Terms, Cookies, Refund and Accessibility pages with the organisation's legal/compliance contact.
10. Replace any placeholder business details before accepting real voters.
