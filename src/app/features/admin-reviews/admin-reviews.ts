import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { ReviewService } from '../../service/review-service';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  imports: [DatePipe],
  templateUrl: './admin-reviews.html',
})
export class AdminReviews {
  private reviewService = inject(ReviewService);

  query = injectInfiniteQuery(() => ({
    queryKey: ['admin-reviews'],
    queryFn: ({ pageParam }) => lastValueFrom(this.reviewService.getAll(pageParam, 10)),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
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
