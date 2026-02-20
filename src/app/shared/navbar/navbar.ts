import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionPersonCircleOutline } from '@ng-icons/ionicons';

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

  logout() {
    this.authService.logout();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  get isLogin(): boolean {
    return this.router.url === '/login';
  }
}
