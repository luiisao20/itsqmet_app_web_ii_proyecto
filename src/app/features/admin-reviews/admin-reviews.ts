import { Component, inject } from '@angular/core';
import { ReviewService } from '../../service/review-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  imports: [DatePipe],
  templateUrl: './admin-reviews.html',
})
export class AdminReviews {
  private reviewService = inject(ReviewService);

  query = injectQuery(() => ({
    queryKey: ['admin-reviews'],
    queryFn: () => lastValueFrom(this.reviewService.getAll()),
  }));
}
