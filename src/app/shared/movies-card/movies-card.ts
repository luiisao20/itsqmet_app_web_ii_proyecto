import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { Button } from '../button/button';

@Component({
  selector: 'app-movies-card',
  imports: [Button],
  templateUrl: './movies-card.html',
  styleUrl: './movies-card.css',
})
export class MoviesCard {
  @Input() movie!: Movie;

  @Input() nowCard?: boolean;
}
