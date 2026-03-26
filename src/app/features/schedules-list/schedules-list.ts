import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ScheduleService } from '../../service/schedule-service';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
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

  scheduleQuery = injectInfiniteQuery(() => ({
    queryKey: ['schedules', 'infinite', this.stablishmentName()],
    queryFn: ({ pageParam }) => this.scheduleService.getAll(pageParam, 10),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number;
    },
  }));

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
