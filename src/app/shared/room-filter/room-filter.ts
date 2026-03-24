import { Component, input, output } from '@angular/core';
import { Schedule } from '../../models/schedule';

@Component({
  selector: 'app-room-filter',
  templateUrl: './room-filter.html',
  styleUrl: './room-filter.css',
})
export class RoomFilter {
  schedules = input.required<Schedule[]>();
  selectedSchedule = input<Schedule | null>(null);
  scheduleSelected = output<Schedule>();

  selectSchedule(schedule: Schedule) {
    this.scheduleSelected.emit(schedule);
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
