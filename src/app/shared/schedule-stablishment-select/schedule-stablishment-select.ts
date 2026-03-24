import { Component, signal } from '@angular/core';
import { Button } from "../button/button";
import {Establishment} from '../../models/establishment';
import { NgIcon } from "@ng-icons/core";
import { StablishmentsTable } from "../stablishments-table/stablishments-table";

@Component({
  selector: 'app-schedule-stablishment-select',
  imports: [Button, NgIcon, StablishmentsTable],
  templateUrl: './schedule-stablishment-select.html',
  styleUrl: './schedule-stablishment-select.css',
})
export class ScheduleStablishmentSelect {
  stablishmentSelected = signal<Establishment | null> (null);

  selectStablishment(item: Establishment) {
    this.stablishmentSelected.set(item);
  }

  onPrev() {

  }

  onNext() {
    
  }
}
