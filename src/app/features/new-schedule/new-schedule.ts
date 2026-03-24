import { Component, signal } from '@angular/core';
import { StepperSchedule } from '../../shared/stepper-schedule/stepper-schedule';
import { ScheduleMovieForm } from '../../shared/schedule-movie-form/schedule-movie-form';
import { Movie } from '../../models/movie';
import { ScheduleStablishmentSelect } from '../../shared/schedule-stablishment-select/schedule-stablishment-select';
import { Establishment } from '../../models/establishment';
import { ScheduleForm } from '../../shared/schedule-form/schedule-form';

interface ScheduleInfo {
  movie?: Movie;
  stablishment?: Establishment;
}

@Component({
  selector: 'app-new-schedule',
  imports: [StepperSchedule, ScheduleMovieForm, ScheduleStablishmentSelect, ScheduleForm],
  templateUrl: './new-schedule.html',
  styleUrl: './new-schedule.css',
})
export class NewSchedule {
  index = signal<number>(0);
  scheduleInfo = signal<ScheduleInfo | null>(null);

  onSetMovie(item: Movie) {
    this.scheduleInfo.update((prev) => ({ ...prev, movie: item }));
    this.index.set(1);
  }

  onSetStablishment(item: Establishment) {
    this.scheduleInfo.update((prev) => ({ ...prev, stablishment: item }));
    this.index.set(2);
  }

  onReturnToMovie() {
    this.scheduleInfo.update((prev) => ({ ...prev, stablishment: undefined }));
    this.index.set(0);
  }

  onReturnToStablishment() {
    this.index.set(1);
  }
}
