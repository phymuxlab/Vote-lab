# Vote Lab — security and compliance update

## What was changed

- Added server-only Supabase secret client.
- Added environment validation and `.env.example`.
- Added signed voting-session cookies instead of trusting a client-editable `electionId:voterId:tokenId` cookie.
- Added durable Postgres rate limiting for server actions.
- Added atomic secure/public ballot submission functions.
- Locked voter, token, vote and registration data behind RLS and server-only access.
- Rebuilt organisation/election/category/nominee authorisation around the authenticated organisation owner.
- Added input validation, length limits, URL validation and upload MIME/size checks.
- Replaced uploaded filenames with UUID-based paths.
- Added security headers and disabled Next.js powered-by header.
- Added responsive dashboard navigation and mobile layouts.
- Added keyboard skip link, accessible labels, focus states and explicit dialog semantics in the updated flows.
- Removed the fake testimonial content and replaced it with factual product workflow copy.
- Replaced the old logo usage with `public/votelab-logo.svg`.
- Added Privacy, Terms, Cookies, Refunds and Accessibility pages.
- Added a cookie notice for essential session/browser storage.
- Removed legacy `/vote/...` UI flows by redirecting them to the current `/elections/...` flow.
- Added a build-time script that normalises case-sensitive UI imports so Linux deployments do not depend on Windows filesystem behaviour.

## Database status

The matching migrations were applied to Supabase project `wcctfuebrdezedoevpvr` during this update.

Current RLS inspection shows RLS enabled on the application data tables. Organiser-facing tables use authenticated-owner policies; voter, token, vote, public ballot and rate-limit tables have no browser-role policies. Public ballot data is fetched by trusted server code using the server secret client.

## Important production requirements

1. Create a Supabase Publishable Key and Secret Key and place them in deployment environment variables. Do not commit either secret.
2. Set `VOTELAB_SESSION_SECRET` to a long random value in every production deployment.
3. Replace the business placeholders in `NEXT_PUBLIC_BUSINESS_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_CONTACT_ADDRESS`.
4. Run `npm audit --audit-level=high` and review the result before release.
5. Test email confirmation, password reset, Google sign-in, organisation creation, election creation, both voting modes, result pages and logout on a production-like build.
6. Review Supabase Auth redirect URLs and OAuth provider settings.
7. Review Storage bucket policies. Uploaded organisation assets should be limited to the intended bucket and file types.
8. Configure backups and an incident-response process before using the system for a real election.
9. Do not describe Public Voting as an identity-verified one-person-one-vote system. Its browser nonce is only a duplicate-submission control for that browser session.
10. Have the final privacy notice, data-retention schedule, data-controller/processor roles, DPIA decision, and any NDPC registration/audit obligations reviewed by the responsible organisation/legal adviser.

## Nigeria data-protection note

The Nigeria Data Protection Act 2023 is the relevant statutory framework where it applies, and the NDPC's GAID 2025 provides operational guidance. The NDPC states that the Act regulates personal-data processing and sets rights and obligations for data controllers/processors. This project therefore treats privacy, minimisation, security, retention and data-subject rights as production requirements, but this repository update is not a legal certification.
