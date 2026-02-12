import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { Categories } from '../../shared/categories/categories';
import { MoviesGrid } from '../../shared/movies-grid/movies-grid';
import { Experience } from '../../shared/experience/experience';

@Component({
  selector: 'app-home',
  imports: [Hero, Categories, MoviesGrid, Experience],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
