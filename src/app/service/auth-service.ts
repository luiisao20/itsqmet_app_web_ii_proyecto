import { inject, Injectable, signal } from '@angular/core';
import { User } from 'firebase/auth';
import { UserService } from './user-service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;

  private userService = inject(UserService);

  isAuthenticated = signal<boolean>(localStorage.getItem('session') === 'true');
  currentRol = signal<string | null>('rol');

  login(email: string, password: string): Observable<boolean> {
    return this.userService.getUsers().pipe(
      map((users) => {
        const userValidate = users.find((u) => u.email === email && u.password === password);

        if (userValidate) {
          localStorage.setItem('session', 'true');
          localStorage.setItem('user', JSON.stringify(userValidate));
          localStorage.setItem('rol', userValidate.rol);
          this.isAuthenticated.set(true);
          this.currentRol.set(userValidate.rol);

          return true;
        }

        return false;
      }),
    );
  }

  logout() {
    localStorage.removeItem('session');
    localStorage.removeItem('user');
    localStorage.removeItem('rol');
    this.isAuthenticated.set(false);
    this.currentRol.set(null);
  }
}
