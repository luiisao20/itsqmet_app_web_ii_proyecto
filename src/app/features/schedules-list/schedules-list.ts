import { Component, inject, signal } from '@angular/core';
import { ScheduleService } from '../../service/schedule-service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { CustomDateTimePipe } from '../../pipes/custom-date-time-pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-schedules-list',
  imports: [CustomDateTimePipe, NgIcon],
  templateUrl: './schedules-list.html',
  styleUrl: './schedules-list.css',
  providers: provideIcons({ heroPencilSquare, heroTrash }),
})
export class SchedulesList {
  private scheduleService = inject(ScheduleService);

  stablishmentName = signal<string | null>(null);

  scheduleQuery = injectQuery(() => ({
    queryKey: ['schedules', this.stablishmentName()],
    queryFn: () =>
      this.stablishmentName() !== null
        ? this.scheduleService.getSchedulesByStablishmentName(this.stablishmentName()!)
        : this.scheduleService.getAll(),
    staleTime: 1000 * 60 * 60,
  }));
}
