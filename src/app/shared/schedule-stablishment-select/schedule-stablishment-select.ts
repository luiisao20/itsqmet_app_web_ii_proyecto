import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Button } from '../button/button';
import { Establishment } from '../../models/establishment';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { StablishmentsTable } from '../stablishments-table/stablishments-table';
import { heroBuildingOffice } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-schedule-stablishment-select',
  imports: [Button, NgIcon, StablishmentsTable],
  templateUrl: './schedule-stablishment-select.html',
  providers: provideIcons({ heroBuildingOffice }),
  styleUrl: './schedule-stablishment-select.css',
})
export class ScheduleStablishmentSelect {
  @Output() setStablishment = new EventEmitter<Establishment>();
  @Output() returnForm = new EventEmitter();
  
  stablishmentSelected = signal<Establishment | null>(null);

  selectStablishment(item: Establishment) {
    this.stablishmentSelected.set(item);
  }

  onPrev() {
    this.stablishmentSelected.set(null);
    this.returnForm.emit();
  }

  onNext() {
    if (this.stablishmentSelected()) {
      this.setStablishment.emit(this.stablishmentSelected()!);
    }
  }
}
