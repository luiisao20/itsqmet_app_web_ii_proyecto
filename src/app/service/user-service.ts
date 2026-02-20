import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { map, Observable } from 'rxjs';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  private API_USER = 'https://aula-virtual-geapsi-default-rtdb.firebaseio.com';

  getUsers(): Observable<UserModel[]> {
    return this.http.get<{ [key: string]: UserModel }>(`${this.API_USER}/users.json`).pipe(
      map((respuesta) => {
        if (!respuesta) {
          return [];
        }

        return Object.keys(respuesta).map((id) => {
          const usuarioConId = { ...respuesta[id], id };
          return usuarioConId;
        });
      }),
    );
  }

  postUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.API_USER}/users.json`, user);
  }
}
