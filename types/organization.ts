export interface Organization {
  id: string;

  owner_id: string;

  name: string;

  slug: string;

  description: string | null;

  logo_url: string | null;

  created_at: string;

  updated_at: string;
}