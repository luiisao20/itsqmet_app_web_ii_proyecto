import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Membership } from '../models/membership';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  private http = inject(HttpClient);

  private API_MEMBERSHIPS = 'http://localhost:8080/memberships';

  getAll(): Observable<Membership[]> {
    return this.http.get<Membership[]>(this.API_MEMBERSHIPS);
  }

  getById(id: number): Observable<Membership> {
    return this.http.get<Membership>(`${this.API_MEMBERSHIPS}/${id}`);
  }

  getByUser(uuid: string): Observable<Membership> {
    return this.http.get<Membership>(`${this.API_MEMBERSHIPS}/user/${uuid}`);
  }

  delete(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_MEMBERSHIPS}/delete/${id}`));
  }
}
