import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-seats-type',
  imports: [NgClass],
  templateUrl: './seats-type.html',
  styleUrl: './seats-type.css',
})
export class SeatsType {
  @Input() variant?: 'normal' | 'disabled' | 'selected' | 'special' = 'normal';
  @Input() text?: string = 'Disponible';
}
