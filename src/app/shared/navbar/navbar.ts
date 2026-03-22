import { Component, inject, signal } from '@angular/core';
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
  host: {
    '(document:click)': 'onDocumentClick($event)',
  },
})
export class Navbar {
  private router = inject(Router);
  private authService = inject(AuthService);

  dropdownOpen = signal(false);
  mobileMenuOpen = signal(false);

  get rol() {
    return this.authService.currentRol();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  email = signal<string | null>(
    localStorage.getItem('email') ? localStorage.getItem('email') : null,
  );

  get isLogin(): boolean {
    return this.router.url === '/login';
  }

  toggleDropdown() {
    this.dropdownOpen.update((v) => !v);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#user-menu-button') && !target.closest('#user-dropdown')) {
      this.dropdownOpen.set(false);
    }
  }

  logout() {
    this.dropdownOpen.set(false);
    this.authService.logout();
  }
}
