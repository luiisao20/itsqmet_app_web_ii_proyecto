import { inject, Injectable } from '@angular/core';
import { Status } from '../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private http = inject(HttpClient);

  private API_CATEGORY = 'http://localhost:8080/movies/statuses';

  get(): Observable<Status[]> {
    return this.http.get<Status[]>(this.API_CATEGORY);
  }
}
