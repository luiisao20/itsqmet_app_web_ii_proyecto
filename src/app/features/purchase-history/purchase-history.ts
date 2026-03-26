import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../service/ticket-service';
import { Ticket } from '../../models/ticket';
import { TicketCard } from '../../shared/ticket-card/ticket-card';

@Component({
  selector: 'app-purchase-history',
  imports: [TicketCard, RouterLink],
  templateUrl: './purchase-history.html',
  styleUrl: './purchase-history.css',
})
export class PurchaseHistory {
  private ticketService = inject(TicketService);

  tickets = signal<Ticket[]>([]);
  loading = signal(true);

  private uuid = localStorage.getItem('uuid') ?? '';

  ngOnInit() {
    if (this.uuid) {
      this.ticketService.getTicketsByUser(this.uuid).subscribe({
        next: (tickets) => {
          this.tickets.set(tickets);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
    } else {
      this.loading.set(false);
    }
  }
}
