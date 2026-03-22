import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private API_USER = 'http://localhost:8080/auth';
  private API_USERS = 'http://localhost:8080/users';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.API_USER}`);
  }

  getUserByUuid(uuid: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.API_USERS}/${uuid}`);
  }

  postUser(user: UserModel): Promise<string> {
    return lastValueFrom(this.http.post(`${this.API_USER}/register`, user, { responseType: 'text' }));
  }

  putUser(id: string, usuario: UserModel): Promise<string> {
    return lastValueFrom(this.http.put(`${this.API_USER}/update/${id}`, usuario, { responseType: 'text' }));
  }

  deleteUser(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_USER}/delete/${id}`));
  }
}
