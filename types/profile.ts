export interface Profile {
  id: string;

  full_name: string | null;

  avatar_url: string | null;

  phone: string | null;

  role: "owner" | "admin" | "moderator" | "member";

  created_at: string;

  updated_at: string;
}