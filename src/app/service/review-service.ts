import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  private API_REVIEWS = 'http://localhost:8080/reviews';

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.API_REVIEWS);
  }

  getReviewsByMovie(movieId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_REVIEWS}/movie/${movieId}`);
  }

  getReviewsByUser(uuid: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_REVIEWS}/user/${uuid}`);
  }

  saveReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.API_REVIEWS}/save`, review);
  }
}
