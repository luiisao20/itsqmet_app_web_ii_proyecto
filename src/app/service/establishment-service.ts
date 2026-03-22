import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Establishment } from '../models/establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private http = inject(HttpClient);

  private API_ESTABLISHMENTS = 'http://localhost:8080/stablishments';

  getEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(`${this.API_ESTABLISHMENTS}`);
  }
}