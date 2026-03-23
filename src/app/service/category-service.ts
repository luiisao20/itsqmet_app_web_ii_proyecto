import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Category } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private API_CATEGORY = 'http://localhost:8080/categories';

  categorySelected = signal<Category | null>(null);

  get(): Promise<Category[]> {
    return lastValueFrom(this.http.get<Category[]>(this.API_CATEGORY));
  }
}
