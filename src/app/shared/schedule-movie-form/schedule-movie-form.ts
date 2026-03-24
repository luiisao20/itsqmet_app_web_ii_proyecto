import { Component, Output, signal, EventEmitter } from '@angular/core';
import { Button } from '../button/button';
import { MovieTable } from '../movie-table/movie-table';
import { Movie } from '../../models/movie';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-schedule-movie-form',
  imports: [Button, MovieTable, CustomDatePipe, NgIcon],
  templateUrl: './schedule-movie-form.html',
  styleUrl: './schedule-movie-form.css',
})
export class ScheduleMovieForm {
  @Output() setMovie = new EventEmitter<Movie>();
  movieSelected = signal<Movie | null>(null);

  onSelectMovie(movie: Movie) {
    this.movieSelected.set(movie);
  }

  onNext() {
    if (this.movieSelected()) {
      this.setMovie.emit(this.movieSelected()!);
    }
  }
}
