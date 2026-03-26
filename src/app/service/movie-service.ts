import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Category, Movie } from '../models/movie';
import { PageResponse } from '../models/Pages';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  private API_MOVIES = 'http://localhost:8080/movies';

  getMovies(page: number = 0, size: number = 10): Promise<PageResponse<Movie>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return lastValueFrom(this.http.get<PageResponse<Movie>>(`${this.API_MOVIES}`, { params }));
  }

  getMoviesByCategory(
    category: Category,
    page: number = 0,
    size: number = 10,
  ): Promise<PageResponse<Movie>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return lastValueFrom(
      this.http.get<PageResponse<Movie>>(`${this.API_MOVIES}/category/${category.id}`, { params }),
    );
  }

  getMoviesByStablishment(id: number): Promise<Movie[]> {
    return lastValueFrom(this.http.get<Movie[]>(`${this.API_MOVIES}/stablishment/${id}`));
  }

  postMovie(movie: Movie): Promise<Movie> {
    return lastValueFrom(this.http.post<Movie>(`${this.API_MOVIES}/save`, movie));
  }

  putMovie(id: number, movie: Movie): Promise<Movie> {
    return lastValueFrom(this.http.put<Movie>(`${this.API_MOVIES}/update/${id}`, movie));
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_MOVIES}/${id}`).pipe(map((resp) => ({ ...resp, id })));
  }

  deleteMovie(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_MOVIES}/delete/${id}`));
  }
}
