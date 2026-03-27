import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { ReportService } from '../../service/report-service';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';

@Component({
  selector: 'app-report-movies',
  imports: [CustomDatePipe],
  templateUrl: './report-movies.html',
  styleUrl: './report-movies.css',
})
export class ReportMovies {
  private reportService = inject(ReportService);

  query = injectInfiniteQuery(() => ({
    queryKey: ['movie-details'],
    queryFn: ({ pageParam }) => this.reportService.getMovieDetails(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  }));

  loadMore() {
    if (this.query.hasNextPage() && !this.query.isFetchingNextPage()) {
      this.query.fetchNextPage();
    }
  }

  reloadQuery() {
    this.reportService.reloadCategory();
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
