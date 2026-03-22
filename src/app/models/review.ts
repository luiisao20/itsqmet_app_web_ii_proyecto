export interface Review {
  id?: number;
  title: string;
  description: string;
  rating: number;
  movie: { id: number };
  user: { uuid: string; name?: string; email?: string };
}