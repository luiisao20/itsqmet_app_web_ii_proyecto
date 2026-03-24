import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroUsers,
  heroFilm,
  heroBuildingStorefront,
  heroCreditCard,
  heroTag,
  heroChatBubbleLeftRight,
  heroEnvelope,
  heroArrowRightOnRectangle,
  heroUserCircle,
  heroBars3,
  heroXMark,
  heroStar,
} from '@ng-icons/heroicons/outline';
import { boxCameraMovie } from '@ng-icons/boxicons/regular';

@Component({
  selector: 'app-movies',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIconComponent],
  providers: provideIcons({
    heroUsers,
    heroFilm,
    heroBuildingStorefront,
    heroCreditCard,
    heroTag,
    heroChatBubbleLeftRight,
    heroEnvelope,
    heroArrowRightOnRectangle,
    heroUserCircle,
    heroBars3,
    heroXMark,
    heroStar,
    boxCameraMovie,
  }),
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {
  private authService = inject(AuthService);
  private router = inject(Router);

  sidebarOpen = signal(false);

  email = localStorage.getItem('email') ?? '';

  menuItems = [
    { label: 'Usuarios', icon: 'heroUsers', route: 'users' },
    { label: 'Establecimientos', icon: 'heroBuildingStorefront', route: 'establishments' },
    { label: 'Membresías', icon: 'heroCreditCard', route: 'memberships' },
    { label: 'Categorías', icon: 'heroTag', route: 'categories' },
    { label: 'Películas', icon: 'heroFilm', route: 'movies' },
    { label: 'Reseñas', icon: 'heroStar', route: 'reviews' },
    { label: 'Contactos', icon: 'heroEnvelope', route: 'contacts' },
    { label: 'Funciones', icon: 'boxCameraMovie', route: 'schedules/new' },
  ];

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
