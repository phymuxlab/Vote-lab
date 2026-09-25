-- Fix the storage policy to explicitly reference storage.objects.name inside the EXISTS clause.
drop policy if exists "Authenticated organization owners can upload organization assets" on storage.objects;

create policy "Authenticated organization owners can upload organization assets"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'organization-assets'
  and (storage.foldername(storage.objects.name))[1] = 'organizations'
  and exists (
    select 1
    from public.organizations o
    where o.id::text = (storage.foldername(storage.objects.name))[2]
      and o.owner_id = (select auth.uid())
  )
);
