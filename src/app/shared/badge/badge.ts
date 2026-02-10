import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-badge',
  imports: [NgClass],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  @Input() select!: boolean;
  @Input() title!: string;
}
