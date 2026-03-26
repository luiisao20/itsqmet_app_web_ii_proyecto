import { inject, Injectable, signal } from '@angular/core';
import { Observable, map, tap, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8080/auth';
  private http = inject(HttpClient);

  isAuthenticated = signal<boolean>(false);
  currentRol = signal<string | null>(localStorage.getItem('rol'));

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.API_URL}/login`, { email, password }).pipe(
      tap((res) => {
        console.log('Login response:', res);
        if (res && res.jwt) {
          localStorage.setItem('token', res.jwt);
          localStorage.setItem('rol', res.role);
          localStorage.setItem('email', res.email);
          localStorage.setItem('uuid', res.uuid);
          this.currentRol.set(res.role);
          this.isAuthenticated.set(true);
        }
      }),
      map((res) => !!(res && res.jwt)),
    );
  }

  register(user: UserModel): Promise<string> {
    return lastValueFrom(
      this.http.post(`${this.API_URL}/register`, user, { responseType: 'text' }),
    );
  }

  postUser(user: UserModel): Promise<String> {
    return lastValueFrom(this.http.post<String>(`${this.API_URL}/register`, user));
  }

  updatePassword(oldPassword: string, newPassword: string) {
    const email = localStorage.getItem('email') ?? '';
    console.log();
    

    return this.http.post<{ message: string }>(`${this.API_URL}/change-password`, {
      email,
      oldPassword,
      newPassword,
    });
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('uuid');
    this.isAuthenticated.set(false);
    this.currentRol.set(null);
  }

  async checkAuthStatus(): Promise<boolean> {
    if (this.isAuthenticated()) return true;

    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      this.isAuthenticated.set(false);
      return false;
    }

    try {
      await lastValueFrom(this.http.get(`${this.API_URL}/validate`));
      this.isAuthenticated.set(true);
      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}
