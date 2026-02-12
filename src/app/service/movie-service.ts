import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http = inject(HttpClient);

  private API_MOVIES = 'https://aula-virtual-geapsi-default-rtdb.firebaseio.com/movies';

  getMovies(): Observable<Movie[]> {
    return this.http.get<{ [key: string]: Movie }>(`${this.API_MOVIES}.json`).pipe(
      map((resp) => {
        if (!resp) return [];

        return Object.keys(resp).map((id) => {
          const movieWithId: Movie = {
            ...resp[id],
            id,
          };
          return movieWithId;
        });
      }),
    );
  }

  postMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.API_MOVIES}.json`, movie);
  }

  putMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.API_MOVIES}/${id}.json`, movie);
  }

  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_MOVIES}/${id}.json`);
  }
}
