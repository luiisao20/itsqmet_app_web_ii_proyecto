import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageResponse } from '../models/Pages';
import { MovieDetail, MovieFinancial, UserMembership } from '../models/details';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private API_URL = 'http://localhost:8080';
  private http = inject(HttpClient);

  getMovieDetails(page: number = 0, size: number = 10): Promise<PageResponse<MovieDetail>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return lastValueFrom(
      this.http.get<PageResponse<MovieDetail>>(`${this.API_URL}/movies/category-view`, { params }),
    );
  }

  getMovieFinancial(page: number = 0, size: number = 10): Promise<PageResponse<MovieFinancial>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return lastValueFrom(
      this.http.get<PageResponse<MovieFinancial>>(`${this.API_URL}/movies/revenew-view`, {
        params,
      }),
    );
  }

  getUsersMembership(page: number = 0, size: number = 10): Promise<PageResponse<UserMembership>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return lastValueFrom(
      this.http.get<PageResponse<UserMembership>>(`${this.API_URL}/users/membership-view`, {
        params,
      }),
    );
  }

  reloadFinancial(): Promise<void> {
    return lastValueFrom(this.http.get<void>(`${this.API_URL}/movies/refresh-financial`));
  }

  reloadCategory(): Promise<void> {
    return lastValueFrom(this.http.get<void>(`${this.API_URL}/movies/refresh-category`));
  }

  reloadUsers(): Promise<void> {
    return lastValueFrom(this.http.get<void>(`${this.API_URL}/users/refresh-view`));
  }
}
