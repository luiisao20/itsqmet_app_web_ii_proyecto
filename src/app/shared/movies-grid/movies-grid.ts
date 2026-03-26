import { Component, ElementRef, Input, effect, inject, viewChild } from '@angular/core';
import { MoviesCard } from '../movies-card/movies-card';
import { MovieService } from '../../service/movie-service';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
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

  query = injectInfiniteQuery(() => ({
    queryKey: ['movies', this.categoryService.categorySelected()],
    queryFn: ({ pageParam }) =>
      this.categoryService.categorySelected() === null
        ? this.movieService.getMovies(pageParam, 8)
        : this.movieService.getMoviesByCategory(
            this.categoryService.categorySelected()!,
            pageParam,
            8,
          ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
  }));

  loadMore() {
    if (this.query.hasNextPage() && !this.query.isFetchingNextPage()) {
      this.query.fetchNextPage();
    }
  }

  anchor = viewChild<ElementRef>('infiniteAnchor');

  constructor() {
    effect(() => {
      const el = this.anchor()?.nativeElement;
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });

      observer.observe(el);
    });
  }
}
