import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../service/ticket-service';
import { Router, RouterLink } from '@angular/router';
import { ionStar } from '@ng-icons/ionicons';

@Component({
  selector: 'app-movie-buy',
  imports: [Badge, NgIconComponent, Button, RouterLink],
  templateUrl: './movie-buy.html',
  providers: [
    provideIcons({ ionLocation, ionCalendar, ionClose, ionArrowForward, ionPlayCircleOutline, ionStar }),
  ],
  styleUrl: './movie-buy.css',
})
export class MovieBuy {
  @Input() movie!: Movie;
  @Input() selectedSeats: SeatNumber[] = [];

  @Output() deleteSeat = new EventEmitter<SeatNumber>();

  private ticketService = inject(TicketService);
  private router = inject(Router);

  onDeleteSeat(seat: SeatNumber) {
    this.deleteSeat.emit(seat);
  }

  buyTicket() {

    if (this.selectedSeats.length === 0) {
      alert('Debe seleccionar al menos un asiento para comprar el ticket');
      return;
    }

    const ticket: Ticket = {
      movie: { id: this.movie.id! },
      seats: this.selectedSeats.map((s) => `${s.row}${s.number}`).join(','),
      price: this.selectedSeats.length * 6.5 + 3,
      room: 2,
      user: { email: localStorage.getItem('email') ?? '' },
    };

    this.ticketService.postTicket(ticket).subscribe({
      next: () => {
        alert('El ticket se ha guardado exitosamente');
        this.router.navigate(['']);
      },
      error: () => {
        alert('Ha ocurrido un error inesperado');
      },
    });
  }
}
