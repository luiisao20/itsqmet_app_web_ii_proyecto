import { Component, signal } from '@angular/core';
import { StepperSchedule } from '../../shared/stepper-schedule/stepper-schedule';
import { ScheduleMovieForm } from '../../shared/schedule-movie-form/schedule-movie-form';
import { Movie } from '../../models/movie';
import { ScheduleStablishmentSelect } from '../../shared/schedule-stablishment-select/schedule-stablishment-select';

interface ScheduleInfo {
  movie: Movie;
}

@Component({
  selector: 'app-new-schedule',
  imports: [StepperSchedule, ScheduleMovieForm, ScheduleStablishmentSelect],
  templateUrl: './new-schedule.html',
  styleUrl: './new-schedule.css',
})
export class NewSchedule {
  index = signal<number>(1);
  scheduleInfo = signal<ScheduleInfo | null>(null);

  onSetMovie(item: Movie) {
    this.scheduleInfo.update((prev) => ({ ...prev, movie: item }));
    this.index.set(1);
  }
}
