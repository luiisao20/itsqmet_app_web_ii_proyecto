import { Component, inject, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { Button } from '../button/button';
import { AuthService } from '../../service/auth-service';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionPlayCircleOutline } from '@ng-icons/ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-card',
  imports: [NgIcon, Button, RouterLink],
  providers: [provideIcons({ ionPlayCircleOutline })],
  templateUrl: './movies-card.html',
  styleUrl: './movies-card.css',
})
export class MoviesCard {
  @Input() movie!: Movie;
  private authService = inject(AuthService);

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
