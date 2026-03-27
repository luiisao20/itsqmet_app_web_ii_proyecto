import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { ReportService } from '../../service/report-service';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-report-financial',
  imports: [],
  templateUrl: './report-financial.html',
  styleUrl: './report-financial.css',
})
export class ReportFinancial {
  private reportService = inject(ReportService);

  query = injectInfiniteQuery(() => ({
    queryKey: ['movie-financial'],
    queryFn: ({ pageParam }) => this.reportService.getMovieFinancial(pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
  }));

  loadMore() {
    if (this.query.hasNextPage() && !this.query.isFetchingNextPage()) {
      this.query.fetchNextPage();
    }
  }

  reladoQuery() {
    this.reportService
      .reloadFinancial()
      .then(() => this.query.refetch())
      .catch((error) => console.log(error));
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
