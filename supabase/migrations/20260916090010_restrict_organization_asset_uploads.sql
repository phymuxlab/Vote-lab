-- Restrict organization asset uploads to the owner of the organization
-- encoded in the storage path: organizations/<organization-id>/logos|banners/<file>.
drop policy if exists "Authenticated users can upload organization assets" on storage.objects;

create policy "Authenticated organization owners can upload organization assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'organization-assets'
  and (storage.foldername(name))[1] = 'organizations'
  and exists (
    select 1
    from public.organizations o
    where o.id::text = (storage.foldername(name))[2]
      and o.owner_id = (select auth.uid())
  )
);
