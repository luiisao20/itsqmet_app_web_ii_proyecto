import { Injectable, signal } from '@angular/core';
import { Establishment } from '../models/establishment';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  selectedEstablishment = signal<Establishment | null>(null);
  selectedDate = signal<string>(this.getLocalDate());

  private getLocalDate(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
}
