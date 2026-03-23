import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Establishment } from '../models/establishment';

@Injectable({
  providedIn: 'root',
})
export class EstablishmentService {
  private http = inject(HttpClient);

  private API_ESTABLISHMENTS = 'http://localhost:8080/stablishments';

  getEstablishments(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(this.API_ESTABLISHMENTS);
  }

  getById(id: number): Observable<Establishment> {
    return this.http.get<Establishment>(`${this.API_ESTABLISHMENTS}/${id}`);
  }

  save(establishment: Partial<Establishment>): Promise<Establishment> {
    return lastValueFrom(this.http.post<Establishment>(`${this.API_ESTABLISHMENTS}/save`, establishment));
  }

  update(id: number, establishment: Partial<Establishment>): Promise<Establishment> {
    return lastValueFrom(this.http.put<Establishment>(`${this.API_ESTABLISHMENTS}/update/${id}`, establishment));
  }

  delete(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_ESTABLISHMENTS}/delete/${id}`));
  }
}
