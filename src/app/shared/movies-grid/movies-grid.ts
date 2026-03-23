import { Component, Input, inject } from '@angular/core';
import { MoviesCard } from '../movies-card/movies-card';
import { MovieService } from '../../service/movie-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CategoryService } from '../../service/category-service';

@Component({
  selector: 'app-movies-grid',
  imports: [MoviesCard],
  templateUrl: './movies-grid.html',
  styleUrl: './movies-grid.css',
})
export class MoviesGrid {
  private movieService = inject(MovieService);
  private categoryService = inject(CategoryService);

  @Input() buyCard?: boolean;

  query = injectQuery(() => ({
    queryKey: ['movies', this.categoryService.categorySelected()],
    queryFn: () =>
      this.categoryService.categorySelected() === null
        ? this.movieService.getMovies()
        : this.movieService.getMoviesByCategory(this.categoryService.categorySelected()!),
  }));
}
