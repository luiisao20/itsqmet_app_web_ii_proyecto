import { inject, Injectable, signal } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  private API_URL = 'http://localhost:8080/auth';
  private http = inject(HttpClient);

  isAuthenticated = signal<boolean>(localStorage.getItem('token') !== null);
  currentRol = signal<string | null>(localStorage.getItem('rol'));

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password }).pipe(
      tap((res) => {

        if (res && res.jwt) {
          localStorage.setItem('token', res.jwt);
          localStorage.setItem('rol', res.role);
          localStorage.setItem('email', res.email);
          this.currentRol.set(res.role);
          this.isAuthenticated.set(true);
        }
      }),
      map((res) => !!(res && res.token)),
    );
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isAuthenticated.set(false);
    this.currentRol.set(null);
  }
}
