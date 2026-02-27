import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map, Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private API_USER = 'http://localhost:8080/users';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.API_USER}`);
  }

  postUser(user: UserModel): Promise<UserModel> {
    return lastValueFrom(this.http.post<UserModel>(`${this.API_USER}/register`, user));
  }

  putUser(id: string, usuario: UserModel): Promise<UserModel> {
    return lastValueFrom(this.http.put<UserModel>(`${this.API_USER}/update/${id}`, usuario));
  }

  deleteUser(id: string): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_USER}/delete/${id}`));
  }
}
