import { Component, Output, signal, EventEmitter } from '@angular/core';
import { Button } from '../button/button';
import { MovieTable } from '../movie-table/movie-table';
import { Movie } from '../../models/movie';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCloseCircleSharp } from '@ng-icons/ionicons';

@Component({
  selector: 'app-schedule-movie-form',
  imports: [Button, MovieTable, CustomDatePipe, NgIcon],
  templateUrl: './schedule-movie-form.html',
  styleUrl: './schedule-movie-form.css',
  providers: provideIcons({ ionCloseCircleSharp }),
})
export class ScheduleMovieForm {
  @Output() setMovie = new EventEmitter<Movie>();
  movieSelected = signal<Movie | null>(null);

  onSelectMovie(movie: Movie) {
    this.movieSelected.set(movie);
  }

  onDeselectMovie() {
    this.movieSelected.set(null);
  }

  onNext() {
    if (this.movieSelected()) {
      this.setMovie.emit(this.movieSelected()!);
    }
  }
}
