import { Component, computed, inject, input, signal } from '@angular/core';
import { FilterService } from '../../service/filter-service';

interface DayItem {
  date: string;
  dayName: string;
  dayNumber: number;
  monthName: string;
}

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.html',
  styleUrl: './date-filter.css',
})
export class DateFilter {
  private filterService = inject(FilterService);

  showMonth = input(true);
  selectedDate = this.filterService.selectedDate;
  weekOffset = signal(0);

  days = computed<DayItem[]>(() => {
    const result: DayItem[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOffset = this.weekOffset() * 7;

    const dayNames = ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'];
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + startOffset + i);

      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');

      result.push({
        date: `${y}-${m}-${d}`,
        dayName: dayNames[date.getDay()],
        dayNumber: date.getDate(),
        monthName: monthNames[date.getMonth()],
      });
    }

    return result;
  });

  currentMonth = computed(() => {
    const selected = this.selectedDate();
    if (!selected) return '';
    const date = new Date(selected + 'T00:00:00');
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
    ];
    return monthNames[date.getMonth()];
  });

  selectDay(day: DayItem) {
    this.selectedDate.set(day.date);
  }

  prevWeek() {
    if (this.weekOffset() > 0) {
      this.weekOffset.update((v) => v - 1);
    }
  }

  nextWeek() {
    this.weekOffset.update((v) => v + 1);
  }
}
