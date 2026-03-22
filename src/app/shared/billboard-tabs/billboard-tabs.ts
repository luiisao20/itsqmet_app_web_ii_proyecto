import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-billboard-tabs',
  imports: [Button],
  templateUrl: './billboard-tabs.html',
  styleUrl: './billboard-tabs.css',
})
export class BillboardTabs {
  tabs = [
    { id: 1, name: 'Cartelera', active: true },
    { id: 2, name: 'Ahora', active: false },
    { id: 3, name: 'Próximamente', active: false },
  ];

  selectTab(selectedTab: { id: number; name: string; active: boolean }) {
    this.tabs.forEach((tab) => (tab.active = false));
    selectedTab.active = true;
  }
}
