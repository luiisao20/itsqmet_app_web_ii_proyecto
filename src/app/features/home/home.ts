import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { MoviesGrid } from '../../shared/movies-grid/movies-grid';
import { Experience } from '../../shared/experience/experience';
import { Categories } from '../../shared/categories/categories';

@Component({
  selector: 'app-home',
  imports: [Hero, MoviesGrid, Experience, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
