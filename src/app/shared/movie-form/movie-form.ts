import { Component, inject } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { Movie } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { Button } from "../button/button";
import { MovieTable } from "../movie-table/movie-table";

@Component({
  selector: 'app-movie-form',
  imports: [FormsModule, Button, MovieTable],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm {
  private movieService = inject(MovieService);

  newMovie: Movie = {
    category: '',
    imageUrl: '',
    overview: '',
    release_date: '',
    status: '',
    time: '0',
    title: '',
    rating: '0',
  };
  edit: boolean = false;

  saveMovie() {
    if (this.edit && this.newMovie.id) {
      this.movieService.putMovie(this.newMovie.id, this.newMovie).subscribe();
    }
    this.movieService.postMovie(this.newMovie).subscribe(() => {
      alert('La pelicula se ha guardado con exito')
    });
    this.resetForm();
  }

  resetForm() {
    this.newMovie = {
      category: '',
      imageUrl: '',
      overview: '',
      release_date: '',
      status: '',
      time: '0',
      title: '',
      rating: '0',
    };
  }

  setMovieToEdit(movie: Movie) {
    this.newMovie = { ...movie };
    this.edit = true;
  }
}
