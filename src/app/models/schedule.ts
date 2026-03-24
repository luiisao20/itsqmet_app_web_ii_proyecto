import { Establishment } from './establishment';
import { Movie } from './movie';

export interface OccupiedSeat {
  fila: string;
  columna: number;
}

export interface Schedule {
  id?: number;
  room: number;
  availableSeats: number;
  occupiedSeats: number;
  movie: Movie | null;
  stablishment: Establishment | null;
  occupiedList: OccupiedSeat[];
  date: string;
  type: string;
}
