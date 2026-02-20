import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInfo } from '../models/contact';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private http = inject(HttpClient);

  private API_CONTACT = 'https://aula-virtual-geapsi-default-rtdb.firebaseio.com/contact';

  getContacts(): Observable<ContactInfo[]> {
    return this.http.get<{ [key: string]: ContactInfo }>(`${this.API_CONTACT}.json`).pipe(
      map((res) => {
        if (!res) return [];

        return Object.keys(res).map((id) => {
          const contact: ContactInfo = {
            id,
            ...res[id],
          };

          return contact;
        });
      }),
    );
  }

  postContact(info: ContactInfo): Observable<ContactInfo> {
    return this.http.post<ContactInfo>(`${this.API_CONTACT}.json`, info);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_CONTACT}/${id}.json`);
  }
}
