import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { PageResponse } from '../models/Pages';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  private API_REVIEWS = 'http://localhost:8080/reviews';

  getAll(page = 0, size = 10): Observable<PageResponse<Review>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<PageResponse<Review>>(this.API_REVIEWS, { params });
  }

  getReviewsByMovie(params: {
    movieId: number;
    page: number;
    size: number;
  }): Observable<PageResponse<Review>> {
    const newParams = new HttpParams()
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    return this.http.get<PageResponse<Review>>(`${this.API_REVIEWS}/movie/${params.movieId}`, {
      params: newParams,
    });
  }

  getReviewsByUser(uuid: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_REVIEWS}/user/${uuid}`);
  }

  saveReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.API_REVIEWS}/save`, review);
  }
}
