import { Component } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.html',
  styleUrl: './date-filter.css',
})
export class DateFilter {
  selectedDate: string = '';

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.selectedDate = input.value;
  }
}
