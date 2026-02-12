import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { Categories } from '../../shared/categories/categories';
import { MoviesGrid } from '../../shared/movies-grid/movies-grid';

@Component({
  selector: 'app-movies',
  imports: [Hero, Categories, MoviesGrid],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}
