import { Component } from '@angular/core';
import { MovieForm } from '../../shared/movie-form/movie-form';

@Component({
  selector: 'app-register-movie',
  imports: [MovieForm],
  templateUrl: './register-movie.html',
  styleUrl: './register-movie.css',
})
export class RegisterMovie {}
