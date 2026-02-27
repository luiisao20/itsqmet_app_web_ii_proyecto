import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seat } from '../../shared/seat/seat';
import { Movie } from '../../models/movie';
import { SeatsType } from '../../shared/seats-type/seats-type';
import { MovieBuy } from '../../shared/movie-buy/movie-buy';
import { MovieService } from '../../service/movie-service';

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
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  seatsPerRow: number = 10;
  seats: SeatNumber[] = [];
  selectedSeats: SeatNumber[] = [];

  movie = signal<Movie | null>(null);

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

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieById(parseInt(id)).subscribe((movie) => {
        this.movie.set(movie);
      });
    }
  }
}
