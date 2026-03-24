import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie';
import { Schedule } from '../../models/schedule';
import { Establishment } from '../../models/establishment';
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
  @Input() schedule: Schedule | null = null;
  @Input() establishment: Establishment | null = null;

  @Output() deleteSeat = new EventEmitter<SeatNumber>();

  private ticketService = inject(TicketService);
  private router = inject(Router);

  get formattedDate(): string {
    if (!this.schedule) return '';
    const date = new Date(this.schedule.date);
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    return `${date.getUTCDate()} de ${months[date.getUTCMonth()]}`;
  }

  get formattedTime(): string {
    if (!this.schedule) return '';
    const date = new Date(this.schedule.date);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}h${minutes}`;
  }

  onDeleteSeat(seat: SeatNumber) {
    this.deleteSeat.emit(seat);
  }

  buyTicket() {
    if (this.selectedSeats.length === 0) {
      alert('Debe seleccionar al menos un asiento para comprar el ticket');
      return;
    }

    if (!this.schedule?.id) {
      alert('Debe seleccionar una función');
      return;
    }

    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      alert('Debe iniciar sesión para comprar un ticket');
      this.router.navigate(['/login']);
      return;
    }

    const ticket: Ticket = {
      price: this.selectedSeats.length * 6.5 + 3,
      seats: this.selectedSeats.map((s) => ({ fila: s.row, columna: s.number })),
      room: this.schedule.room,
      numberSeats: this.selectedSeats.length,
      user: { uuid },
      schedule: { id: this.schedule.id },
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
