import { Component, inject, Input, signal } from '@angular/core';
import { Movie } from '../../models/movie';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ScheduleService } from '../../service/schedule-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CustomDateTimePipe } from '../../pipes/custom-date-time-pipe';
import { boxEdit, boxTrash } from '@ng-icons/boxicons/regular';
import { Schedule } from '../../models/schedule';

@Component({
  selector: 'app-movie-function',
  imports: [CustomDatePipe, NgIcon, CustomDateTimePipe],
  templateUrl: './movie-function.html',
  styleUrl: './movie-function.css',
  providers: provideIcons({ boxTrash, boxEdit }),
})
export class MovieFunction {
  @Input() item!: Movie;
  @Input() stablishmentId!: number;

  private scheduleService = inject(ScheduleService);

  loadingDelete = signal<boolean>(false);

  queryFunctions = injectQuery(() => ({
    queryKey: ['function-movie', this.item.id, this.stablishmentId],
    enabled: false,
    queryFn: () =>
      this.scheduleService.getSchedulesByStablishment(this.stablishmentId, this.item.id!),
  }));

  onShowFunctions() {
    this.queryFunctions.refetch();
  }

  onEditSchedule(schedule: Schedule) {}

  onDeleteSchedule(schedule: Schedule) {
    if (confirm('¿Estás seguro de eliminar la función?')) {
      this.loadingDelete.set(true);
      this.scheduleService.deleteSchedule(schedule.id!).subscribe({
        next: () => {
          this.queryFunctions.refetch();
        },
        error: (error) => {
          alert(`Ha ocurrido un error: ${error}`);
        },
        complete: () => {
          this.loadingDelete.set(false);
        }
      });
    }
  }
}
