import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Schedule } from '../models/schedule';
import { lastValueFrom, Observable } from 'rxjs';
import { PageResponse } from '../models/Pages';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  private http = inject(HttpClient);

  private URL_SCHEDULE = 'http://localhost:8080/schedules';

  getSchedulesByStablishment(sId: number, mId: number): Promise<Schedule[]> {
    return lastValueFrom(
      this.http.get<Schedule[]>(`${this.URL_SCHEDULE}/stablishment/${sId}/movie/${mId}`),
    );
  }

  getSchedulesByStablishmentName(params: {
    name: string;
    page: number;
    size: number;
  }): Promise<PageResponse<Schedule>> {
    const newParams = new HttpParams()
      .set('name', params.name)
      .set('page', params.page.toString())
      .set('size', params.size.toString());
    return lastValueFrom(
      this.http.get<PageResponse<Schedule>>(`${this.URL_SCHEDULE}/stablishmentName`, {
        params: newParams,
      }),
    );
  }

  getAll(newParams: {
    page: number;
    size: number;
    stabName?: string;
    movieTitle?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<PageResponse<Schedule>> {
    const params = new HttpParams()
      .set('page', newParams.page.toString())
      .set('size', newParams.size.toString())
      .set('stabName', newParams.stabName ?? '')
      .set('movieTitle', newParams.movieTitle ?? '')
      .set('startDate', newParams.startDate ?? '')
      .set('endDate', newParams.endDate ?? '');

    return lastValueFrom(this.http.get<PageResponse<Schedule>>(`${this.URL_SCHEDULE}/filters`, { params }));
  }

  getTimeAvaiable({
    movieId,
    stablishmentId,
    date,
  }: {
    movieId: number;
    stablishmentId: number;
    date: string;
  }): Promise<string[]> {
    const params = new HttpParams()
      .set('movieId', movieId.toString())
      .set('stablishmentId', stablishmentId.toString())
      .set('date', date.toString());

    return lastValueFrom(
      this.http.get<string[]>(`${this.URL_SCHEDULE}/time-available`, { params }),
    );
  }

  getSchedulesByMovie(id: number): Promise<Schedule[]> {
    return lastValueFrom(this.http.get<Schedule[]>(`${this.URL_SCHEDULE}/movie/${id}`));
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL_SCHEDULE}/delete/${id}`);
  }

  saveSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.URL_SCHEDULE}/save`, schedule);
  }
}
