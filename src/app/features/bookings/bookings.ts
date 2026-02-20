import { Component } from '@angular/core';
import { Seat } from '../../shared/seat/seat';
import { Movie } from '../../models/movie';
import { SeatsType } from '../../shared/seats-type/seats-type';
import { MovieBuy } from '../../shared/movie-buy/movie-buy';

export interface SeatNumber {
  row: string;
  number: number;
}

interface SeatType {
  type: 'normal' | 'disabled' | 'selected' | 'special';
  text: string;
}

@Component({
  selector: 'app-bookings',
  imports: [Seat, SeatsType, MovieBuy],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  seatsPerRow: number = 10;
  seats: SeatNumber[] = [];
  selectedSeats: SeatNumber[] = [];

  movie: Movie = {
    id: '1',
    title: 'Dune: Part Two',
    imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    category: 'Ciencia Ficción',
    time: '2h 46m',
  };

  seatsType: SeatType[] = [
    {
      type: 'normal',
      text: 'Disponible',
    },
    {
      type: 'disabled',
      text: 'Ocupado',
    },
    {
      type: 'selected',
      text: 'Seleccionado',
    },
    {
      type: 'special',
      text: 'VIP',
    },
  ];

  toggleSeat(newSeat: SeatNumber) {
    const index = this.selectedSeats.findIndex(
      (seat) => seat.row === newSeat.row && seat.number === newSeat.number,
    );

    if (index === -1) this.selectedSeats.push(newSeat);
    else this.selectedSeats.splice(index, 1);
  }

  isSeatSelected(seat: SeatNumber): boolean {
    return this.selectedSeats.some((s) => s.number === seat.number && s.row === seat.row);
  }

  deSelectSeat(seatSelected: SeatNumber) {
    const index = this.selectedSeats.findIndex(
      (seat) => seat.row === seatSelected.row && seat.number === seatSelected.number,
    );

    this.selectedSeats.splice(index, 1);
  }

  ngOnInit() {
    for (let row of this.rows) {
      for (let number = 1; number <= this.seatsPerRow; number++) {
        this.seats.push({ row, number });
      }
    }
  }
}
