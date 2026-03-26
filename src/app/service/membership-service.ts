import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Membership } from '../models/membership';
import { PageResponse } from '../models/Pages';

@Injectable({
  providedIn: 'root',
})
export class MembershipService {
  private http = inject(HttpClient);

  private API_MEMBERSHIPS = 'http://localhost:8080/memberships';

  getAll(page = 0, size = 10): Observable<PageResponse<Membership>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResponse<Membership>>(this.API_MEMBERSHIPS, { params });
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
