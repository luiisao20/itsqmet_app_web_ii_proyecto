import { Component, input, computed } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { Schedule } from '../../models/schedule';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-ticket-card',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './ticket-card.html',
  styleUrl: './ticket-card.css',
})
export class TicketCard {
  ticket = input.required<Ticket>();

  schedule = computed(() => this.ticket().schedule as Schedule);

  movieTitle = computed(() => this.schedule().movie?.title ?? 'Película');

  movieImage = computed(() => this.schedule().movie?.imageUrl ?? '');

  establishmentName = computed(() => this.schedule().stablishment?.name ?? '');

  scheduleDate = computed(() => {
    const date = new Date(this.schedule().date);
    return date;
  });

  scheduleTime = computed(() => {
    const date = new Date(this.schedule().date);
    return date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
  });

  seatsLabel = computed(() => {
    return this.ticket().seats.map((s) => `${s.fila}${s.columna}`).join(', ');
  });
}
