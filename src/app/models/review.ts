export interface Review {
  id?: number;
  title: string;
  description: string;
  rating: number;
  createdAt?: string;
  movie: { id: number; title?: string };
  user: { uuid: string; name?: string; email?: string };
}
