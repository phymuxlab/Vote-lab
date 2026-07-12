export interface Category {
  id: string;

  election_id: string;

  name: string;

  description: string | null;

  max_votes: number;

  created_at: string;
}