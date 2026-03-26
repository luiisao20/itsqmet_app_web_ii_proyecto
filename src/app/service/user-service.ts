import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { UserModel } from '../models/user';
import { PageResponse } from '../models/Pages';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private API_URL = 'http://localhost:8080/users';

  getUsers(page = 0, size = 10): Observable<PageResponse<UserModel>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResponse<UserModel>>(`${this.API_URL}`, { params });
  }

  getUserByUuid(uuid: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API_URL}/${uuid}`);
  }

  putUser(id: string, usuario: UserModel): Promise<String> {
    return lastValueFrom(this.http.put<String>(`${this.API_URL}/update/${id}`, usuario));
  }

  deleteUser(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_URL}/delete/${id}`));
  }
}
