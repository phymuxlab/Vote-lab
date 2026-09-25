# Vote Lab UI Redesign — September 2026

## Included in this update

- Reworked the organiser dashboard shell with a fixed desktop sidebar and mobile navigation drawer.
- Added contextual dashboard header titles so pages no longer all display `Dashboard`.
- Redesigned dashboard, organisation list, organisation workspace, election list and organisation forms with a responsive SaaS-style UI.
- Replaced the Vote Lab wordmark/mark with a new SVG brand treatment.
- Replaced emoji UI decorations in the reviewed application areas with Lucide icons.
- Removed the organisation banner uploader from the UI and upload action because the banner is not currently used in the voter experience. The existing database field is intentionally left untouched for compatibility.
- Added a client-side square organisation-logo cropper with drag, zoom, reset and 512 × 512 WebP output.
- Kept existing routes, Server Actions, Supabase structure and voting flow intact.
- Kept the rate limiter in place; it was not disabled or replaced with a fail-open fallback.

## Important test note

This folder was produced from the latest lint-clean/build-successful Vote Lab project supplied in the conversation. The final local validation should still be run in the user's environment after installing dependencies:

```bash
npm install
npm run lint
npm run build
npm run dev
```

The Supabase rate limiter should also be tested by submitting an organisation/election creation form. If `consume_rate_limit` is not present in the connected Vote Lab Supabase database, apply the existing migration under `supabase/migrations/20260916085919_security_hardening.sql` before treating that runtime error as a frontend problem.

## Environment files

`.env.local` is intentionally not included. Keep the user's existing local environment file when replacing project files.
