export interface Election {
  id: string;

  organization_id: string;

  title: string;

  description: string | null;

  start_date: string;

  end_date: string;

  status: "draft" | "published" | "closed";

  is_published: boolean;

  allow_results: boolean;

  created_at: string;

  updated_at: string | null;
}