import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';
import { Category } from '../models/movie';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private API_CATEGORY = 'http://localhost:8080/categories';

  get(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_CATEGORY);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.API_CATEGORY}/${id}`);
  }

  save(category: { name: string }): Promise<Category> {
    return lastValueFrom(this.http.post<Category>(`${this.API_CATEGORY}/save`, category));
  }

  update(id: number, category: { name: string }): Promise<Category> {
    return lastValueFrom(this.http.put<Category>(`${this.API_CATEGORY}/update/${id}`, category));
  }

  delete(id: number): Promise<void> {
    return lastValueFrom(this.http.delete<void>(`${this.API_CATEGORY}/delete/${id}`));
  }
}
