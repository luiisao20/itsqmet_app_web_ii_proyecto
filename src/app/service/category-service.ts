import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private API_CATEGORY = 'http://localhost:8080/movies/categories'

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_CATEGORY);
  }
}
