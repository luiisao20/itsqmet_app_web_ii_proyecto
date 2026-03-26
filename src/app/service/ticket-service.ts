import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Ticket} from '../models/ticket';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);

  private API_TICKET = 'http://localhost:8080/tickets';

  postTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.API_TICKET}/save`, ticket);
  }

  getTicket(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.API_TICKET}/${id}`);
  }

  getTicketsByUser(uuid: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.API_TICKET}/user/${uuid}`);
  }
}
