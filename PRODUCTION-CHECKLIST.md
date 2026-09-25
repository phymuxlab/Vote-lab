# Vote Lab production checklist

## Security
- [ ] Supabase Secret Key configured server-side only.
- [ ] `VOTELAB_SESSION_SECRET` configured.
- [ ] No `.env.local`, secrets, service-role keys or tokens committed.
- [ ] Supabase Auth redirect URLs restricted to real domains.
- [ ] Storage policies reviewed.
- [ ] `npm audit --audit-level=high` reviewed.
- [ ] Production build passes.
- [ ] Security headers verified in browser/network tools.

## Accessibility
- [ ] Keyboard-only navigation tested.
- [ ] Focus indicators visible.
- [ ] Form errors announced and understandable.
- [ ] Meaningful images have useful alt text.
- [ ] Uploaded nominee/organisation images are checked for appropriate alternative text.
- [ ] Colour contrast checked for organiser-supplied theme colours.
- [ ] Mobile voting flow tested at small widths.

## Privacy and legal
- [ ] Legal business name supplied.
- [ ] Real contact email supplied.
- [ ] Real business address supplied.
- [ ] Election-specific privacy notice supplied by organiser where required.
- [ ] Data retention periods documented.
- [ ] Data-subject request process documented.
- [ ] DPIA/high-risk processing decision documented where applicable.
- [ ] NDP Act/GAID obligations reviewed with a qualified adviser where applicable.
- [ ] Copyright/licence permission confirmed for every uploaded image/logo.
- [ ] No unsupported testimonials or performance claims remain.

## Election integrity
- [ ] Test Public Voting and Secure Voting separately.
- [ ] Test token expiry and reuse.
- [ ] Test duplicate registration.
- [ ] Test duplicate ballot submission.
- [ ] Test election start/end enforcement.
- [ ] Test category/nominee tampering.
- [ ] Test organiser access using a second account.
- [ ] Verify that one organiser cannot access another organiser's dashboard data.
