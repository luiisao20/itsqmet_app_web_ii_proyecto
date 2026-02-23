import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPersonCircleOutline } from '@ng-icons/ionicons';
import { User } from 'firebase/auth';
import { UserModel } from '../../models/user';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIconComponent],
  templateUrl: './navbar.html',
  providers: provideIcons({ ionPersonCircleOutline }),
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  private authService = inject(AuthService);
  rol = this.authService.currentRol();

  logout() {
    this.authService.logout();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  user = signal<UserModel | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  );

  get isLogin(): boolean {
    return this.router.url === '/login';
  }
}
