import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-button-description',
  imports: [NgTemplateOutlet],
  templateUrl: './button-description.html',
  styleUrl: './button-description.css',
})
export class ButtonDescription {
  @Input() icon?: TemplateRef<void>;
  @Input() title!: string;
  @Input() description!: string;
}
