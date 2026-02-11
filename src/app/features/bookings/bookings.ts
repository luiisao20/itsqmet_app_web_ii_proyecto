import { Component } from '@angular/core';
import { Seat } from '../../shared/seat/seat';

interface SeatNumber {
  row: string;
  number: number;
}

@Component({
  selector: 'app-bookings',
  imports: [Seat],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  seatsPerRow: number = 10;
  seats: SeatNumber[] = [];

  ngOnInit() {
    for (let row of this.rows) {
      for (let number = 1; number <= this.seatsPerRow; number++) {
        this.seats.push({ row, number });
      }
    }
  }
}
