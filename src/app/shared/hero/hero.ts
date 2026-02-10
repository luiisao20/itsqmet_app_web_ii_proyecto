import { Component } from '@angular/core';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';

@Component({
  selector: 'app-hero',
  imports: [Badge, Button],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  badges = [
    {
      id: 1,
      name: 'EN TENDENCIA',
      select: true,
    },
    {
      id: 2,
      name: 'EXPERIENCIA IMAX',
      select: false,
    },
  ];
}
