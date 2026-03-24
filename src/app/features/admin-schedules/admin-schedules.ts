import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBuildingOffice, heroPencilSquare, heroVideoCamera } from '@ng-icons/heroicons/outline';
import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-admin-schedules',
  imports: [NgIcon, RouterLink, RouterOutlet, RouterLinkActive],
  providers: provideIcons({ heroPencilSquare, heroBuildingOffice, heroVideoCamera }),
  templateUrl: './admin-schedules.html',
  styleUrl: './admin-schedules.css',
})
export class AdminSchedules {
}
