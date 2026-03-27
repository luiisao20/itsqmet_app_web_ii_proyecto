import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { ReportService } from '../../service/report-service';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-report-users',
  imports: [],
  templateUrl: './report-users.html',
  styleUrl: './report-users.css',
})
export class ReportUsers {
  private reportService = inject(ReportService);

  query = injectInfiniteQuery(() => ({
    queryKey: ['users-membership'],
    queryFn: ({ pageParam }) => this.reportService.getUsersMembership(pageParam, 10),
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
      .reloadUsers()
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
