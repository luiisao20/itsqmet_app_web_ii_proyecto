import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  // private API_MOVIES = 'https://aula-virtual-geapsi-default-rtdb.firebaseio.com/movies';
  private API_MOVIES = 'http://localhost:8080/movies';

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.API_MOVIES}`);
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
