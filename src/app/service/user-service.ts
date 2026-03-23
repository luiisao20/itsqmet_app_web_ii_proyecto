import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private API_URL = 'http://localhost:8080/users';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.API_URL}`);
  }

  getUserByUuid(uuid: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API_URL}/${uuid}`);
  }

  putUser(id: string, usuario: UserModel): Promise<String> {
    return lastValueFrom(this.http.put<String>(`${this.API_USER}/update/${id}`, usuario));
  }

  deleteUser(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_URL}/delete/${id}`));
  }
}
