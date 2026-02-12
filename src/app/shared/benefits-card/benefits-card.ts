import { Component, Input } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { ionDiamond, ionFastFood, ionTv } from '@ng-icons/ionicons';

@Component({
  selector: 'app-benefits-card',
  imports: [NgIcon],
  providers: [provideIcons({ ionDiamond, ionTv, ionFastFood })],
  templateUrl: './benefits-card.html',
  styleUrl: './benefits-card.css',
})
export class BenefitsCard {
  @Input() title!: string;
  @Input() icon!: string;
  @Input() description!: string;
  @Input() image!: string;
}
