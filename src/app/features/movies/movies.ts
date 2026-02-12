import { Component } from '@angular/core';
import { MovieForm } from '../../shared/movie-form/movie-form';
import { Button } from '../../shared/button/button';
import { MovieTable } from '../../shared/movie-table/movie-table';

@Component({
  selector: 'app-movies',
  imports: [MovieForm, Button, MovieTable],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}
