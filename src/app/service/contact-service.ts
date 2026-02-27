import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInfo } from '../models/contact';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  private API_CONTACT = 'http://localhost:8080/contact';

  getContacts(): Observable<ContactInfo[]> {
    return this.http.get<ContactInfo[]>(`${this.API_CONTACT}`);
  }

  postContact(info: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(`${this.API_CONTACT}/save`, info);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_CONTACT}/delete/${id}`);
  }
}
