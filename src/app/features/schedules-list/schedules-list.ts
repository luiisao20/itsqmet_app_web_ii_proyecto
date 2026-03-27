import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ScheduleService } from '../../service/schedule-service';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { CustomDateTimePipe } from '../../pipes/custom-date-time-pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { Button } from '../../shared/button/button';

interface Filters {
  stablishment?: string;
  movie?: string;
  startDate?: string;
  endDate?: string;
}

@Component({
  selector: 'app-schedules-list',
  imports: [CustomDateTimePipe, NgIcon, Button],
  templateUrl: './schedules-list.html',
  styleUrl: './schedules-list.css',
  providers: provideIcons({ heroPencilSquare, heroTrash }),
})
export class SchedulesList {
  private scheduleService = inject(ScheduleService);

  stablishment = signal<string | undefined>(undefined);
  movie = signal<string | undefined>(undefined);
  endDate = signal<string | undefined>(undefined);
  startDate = signal<string | undefined>(undefined);

  scheduleQuery = injectInfiniteQuery(() => ({
    queryKey: [
      'schedules',
      'infinite',
      this.stablishment(),
      this.movie(),
      this.endDate(),
      this.startDate(),
    ],
    queryFn: ({ pageParam }) =>
      this.scheduleService.getAll({
        page: pageParam,
        size: 10,
        movieTitle: this.movie(),
        stabName: this.stablishment(),
        startDate: this.startDate(),
        endDate: this.endDate(),
      }),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 1;
    },
  }));

  clean() {
    this.stablishment.set(undefined);
    this.movie.set(undefined);
    this.endDate.set(undefined);
    this.startDate.set(undefined);
  }

  loadMore() {
    if (this.scheduleQuery.hasNextPage() && !this.scheduleQuery.isFetchingNextPage()) {
      this.scheduleQuery.fetchNextPage();
    }
  }

  anchor = viewChild<ElementRef>('infiniteAnchor');

  constructor() {
    effect(() => {
      const el = this.anchor()?.nativeElement;
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });

      observer.observe(el);
    });
  }
}
