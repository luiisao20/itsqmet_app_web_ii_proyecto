import { Component, inject } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { Movie } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { MovieTable } from '../movie-table/movie-table';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-movie-form',
  imports: [FormsModule, Button, MovieTable],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm {
  private movieService = inject(MovieService);
  private queryClient = inject(QueryClient);

  newMovie: Movie = {
    category: undefined,
    imageUrl: '',
    overview: '',
    releaseDate: '',
    status: undefined,
    time: '0',
    title: '',
    rating: '0',
    trailer: '',
  };
  edit: boolean = false;

  mutation = injectMutation(() => ({
    mutationFn: () =>
      this.newMovie.id
        ? this.movieService.putMovie(this.newMovie.id, this.newMovie)
        : this.movieService.postMovie(this.newMovie),

    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['movies'] });

      if (this.edit) alert('El registro se ha actualizado exitosamente');
      else alert('El registro se ha creado exitosamente');

      this.resetForm();
    },
  }));

  saveMovie() {
    console.log(this.newMovie);

    // if (this.edit && this.newMovie.id) {
    //   this.movieService.putMovie(this.newMovie.id, this.newMovie);
    // }
    // this.movieService.postMovie(this.newMovie);
    // this.resetForm();
  }

  resetForm() {
    this.newMovie = {
      category: undefined,
      imageUrl: '',
      overview: '',
      releaseDate: '',
      status: undefined,
      time: '0',
      title: '',
      rating: '0',
      trailer: '',
    };
  }

  setMovieToEdit(movie: Movie) {
    this.newMovie = { ...movie };
    this.edit = true;
  }
}
