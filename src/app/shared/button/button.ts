import { Component, Input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet, NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() paddingVertical?: string;
  @Input() paddingHorizontal?: string;
  @Input() shadow?: string;
  @Input() animation!: boolean;
  @Input() background?: string;
  @Input() border?: boolean;
  @Input() borderColor?: string;
  @Input() title!: string;
  @Input() textStyle!: string;
  @Input() prefixIcon?: TemplateRef<void>;
  @Input() suffixIcon?: TemplateRef<void>;
  @Input() type?: string = 'button';
}
