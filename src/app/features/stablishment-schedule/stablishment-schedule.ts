import { Component, inject, signal } from '@angular/core';
import { EstablishmentService } from '../../service/establishment-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { Establishment } from '../../models/establishment';
import { ScheduleService } from '../../service/schedule-service';
import {MovieService} from '../../service/movie-service';
import { MovieFunction } from "../../shared/movie-function/movie-function";

@Component({
  selector: 'app-stablishment-schedule',
  imports: [MovieFunction],
  templateUrl: './stablishment-schedule.html',
  styleUrl: './stablishment-schedule.css',
})
export class StablishmentSchedule {
  private stablishmentService = inject(EstablishmentService);
  private scheduleService = inject(ScheduleService);
  private movieService = inject(MovieService);

  stablishment = signal<Establishment | null>(null);

  queryStablishments = injectQuery(() => ({
    queryKey: ['stablishments'],
    queryFn: () => lastValueFrom(this.stablishmentService.getEstablishments()),
  }));

  queryMovies = injectQuery(() => ({
    queryKey: ['movie', this.stablishment()?.id],
    queryFn: () => {
      if (this.stablishment() !== null) {
        return this.movieService.getMoviesByStablishment(this.stablishment()?.id!);
      } else return [];
    },
  }));

  onSelectStablishment(item: Establishment) {
    this.stablishment.set(item);
  }
}
