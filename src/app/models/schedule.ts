import { Establishment } from './establishment';
import { Movie } from './movie';

export interface Schedule {
  id?: number;
  room: number;
  availableSeats: number;
  occupiedSeats: number;
  movie: Movie | null;
  stablishment: Establishment | null;
  occupiedList: any[];
  date: string;
  type: string;
}
