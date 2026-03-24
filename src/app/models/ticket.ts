export interface TicketSeat {
  fila: string;
  columna: number;
}

export interface Ticket {
  id?: number;
  price: number;
  seats: TicketSeat[];
  room: number;
  numberSeats: number;
  createdAt?: string;
  user: {
    uuid: string;
    name?: string;
    email?: string;
    role?: string;
  };
  schedule: {
    id: number;
  };
}
