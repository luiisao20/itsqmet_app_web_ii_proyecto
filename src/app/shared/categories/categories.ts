import { Component } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-categories',
  imports: [Button],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categories = [
    {
      id: 1,
      name: 'Todo',
      selectCategory: true,
    },
    {
      id: 2,
      name: 'Acción',
      selectCategory: false,
    },
    {
      id: 3,
      name: 'Comedia',
      selectCategory: false,
    },
    {
      id: 4,
      name: 'Animación',
      selectCategory: false,
    },
    {
      id: 5,
      name: 'Terror',
      selectCategory: false,
    },
  ];
}
