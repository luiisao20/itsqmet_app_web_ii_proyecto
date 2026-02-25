import { Component, Input, inject } from '@angular/core';
import { MoviesCard } from '../movies-card/movies-card';
import { Movie } from '../../models/movie';
import { MovieService } from '../../service/movie-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-movies-grid',
  imports: [MoviesCard],
  templateUrl: './movies-grid.html',
  styleUrl: './movies-grid.css',
})
export class MoviesGrid {
  private movieService = inject(MovieService);

  @Input() buyCard?: boolean;

  query = injectQuery(() => ({
    queryKey: ['movies'],
    queryFn: () => lastValueFrom(this.movieService.getMovies()),
  }));
}
