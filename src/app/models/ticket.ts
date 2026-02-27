export interface Ticket {
  id?: number;
  price: number;
  seats: string;
  room: number;
  createdAt?: Date;
  user: {
    email: string;
  };
  movie: {
    id: number;
  };
}
