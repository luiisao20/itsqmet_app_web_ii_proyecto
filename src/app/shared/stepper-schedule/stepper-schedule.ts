import { Component, Input } from '@angular/core';
import { boxCameraMovie } from '@ng-icons/boxicons/regular';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {heroBuildingOffice} from '@ng-icons/heroicons/outline';
import {ionNewspaperSharp} from '@ng-icons/ionicons';

interface Step {
  title: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-stepper-schedule',
  imports: [NgIcon],
  templateUrl: './stepper-schedule.html',
  styleUrl: './stepper-schedule.css',
  providers: provideIcons({ boxCameraMovie, heroBuildingOffice, ionNewspaperSharp }),
})
export class StepperSchedule {
  @Input() currentIndex!: number;

  steps: Step[] = [
    {
      title: 'Película',
      label: 'Escoge una película',
      icon: 'boxCameraMovie',
    },
    {
      title: 'Establecimiento',
      label: 'Selecciona un establecimiento',
      icon: 'heroBuildingOffice'
    },
    {
      title: 'Datos',
      label: 'Ingresa los datos de la función',
      icon: 'ionNewspaperSharp'
    }
  ];
}
