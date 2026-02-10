import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies-card',
  imports: [],
  templateUrl: './movies-card.html',
  styleUrl: './movies-card.css',
})
export class MoviesCard {
  @Input() movie!: Movie;
}
