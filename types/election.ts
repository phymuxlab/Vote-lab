export interface Election {
  id: string;
  organization_id: string;

  title: string;
  description: string | null;

  start_date: string;
  end_date: string;

  status: "draft" | "published" | "closed";

  created_at: string;
  updated_at: string | null;
}