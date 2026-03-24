import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../models/schedule';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient);

  private URL_SCHEDULE = 'http://localhost:8080/schedules';

  getSchedulesByStablishment(sId: number, mId: number): Promise<Schedule[]> {
    return lastValueFrom(this.http.get<Schedule[]>(`${this.URL_SCHEDULE}/stablishment/${sId}/movie/${mId}`));
  }

  getSchedulesByMovie(id: number): Promise<Schedule[]> {
    return lastValueFrom(this.http.get<Schedule[]>(`${this.URL_SCHEDULE}/movie/${id}`));
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_SCHEDULE}/delete/${id}`);
  }
}
