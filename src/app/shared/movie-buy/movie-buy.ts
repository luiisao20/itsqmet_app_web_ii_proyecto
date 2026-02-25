import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { Badge } from '../badge/badge';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  ionLocation,
  ionCalendar,
  ionClose,
  ionArrowForward,
  ionPlayCircleOutline,
} from '@ng-icons/ionicons';
import { SeatNumber } from '../../features/bookings/bookings';
import { Button } from '../button/button';

@Component({
  selector: 'app-movie-buy',
  imports: [Badge, NgIconComponent, Button],
  templateUrl: './movie-buy.html',
  providers: [
    provideIcons({ ionLocation, ionCalendar, ionClose, ionArrowForward, ionPlayCircleOutline }),
  ],
  styleUrl: './movie-buy.css',
})
export class MovieBuy {
  @Input() movie!: Movie;
  @Input() selectedSeats: SeatNumber[] = [];

  @Output() deleteSeat = new EventEmitter<SeatNumber>();

  onDeleteSeat(seat: SeatNumber) {
    this.deleteSeat.emit(seat);
  }
}
