import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-seat',
  imports: [NgClass],
  templateUrl: './seat.html',
  styleUrl: './seat.css',
})
export class Seat {
  @Input() seatNumber!: number;
  @Input() isSelected?: boolean;
  @Input() isOccupied?: boolean;
}
