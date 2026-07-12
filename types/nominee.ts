export interface Nominee {
  id: string;

  category_id: string;

  full_name: string;

  biography: string | null;

  image_url: string | null;

  created_at: string;
}