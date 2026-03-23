import { Component, inject } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { Movie, Category } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { MovieTable } from '../movie-table/movie-table';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { CategoryService } from '../../service/category-service';
import { StatusService } from '../../service/status-service';

interface MovieModel {
  id?: number;
  categories: Category[];
  imageUrl: string;
  overview: string;
  releaseDate: string;
  status: string;
  time: string;
  title: string;
  rating: string;
  trailer: string;
}

@Component({
  selector: 'app-movie-form',
  imports: [FormsModule, Button, MovieTable],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
})
export class MovieForm {
  private movieService = inject(MovieService);
  private queryClient = inject(QueryClient);
  private categoryService = inject(CategoryService);
  private statusService = inject(StatusService);

  newMovie: MovieModel = {
    categories: [],
    imageUrl: '',
    overview: '',
    releaseDate: '',
    status: '0',
    time: '0',
    title: '',
    rating: '0',
    trailer: '',
  };
  edit: boolean = false;

  queryCategory = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => this.categoryService.get(),
  }));

  queryStatus = injectQuery(() => ({
    queryKey: ['statuses'],
    queryFn: () => this.statusService.get(),
  }));

  mutation = injectMutation(() => ({
    mutationFn: () => {
      const movieToSave: Movie = {
        id: this.newMovie.id,
        categories: this.newMovie.categories,
        imageUrl: this.newMovie.imageUrl,
        overview: this.newMovie.overview,
        releaseDate: this.newMovie.releaseDate,
        status: {
          id: parseInt(this.newMovie.status),
        },
        time: this.newMovie.time,
        title: this.newMovie.title,
        rating: this.newMovie.rating,
        trailer: this.newMovie.trailer,
      };
      if (this.newMovie.id) return this.movieService.putMovie(this.newMovie.id, movieToSave)
      return this.movieService.postMovie(movieToSave);
    },

    onError: (error) => {
      alert('Ha ocurrido un error');
    },

    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['movies'] });

      if (this.edit) alert('El registro se ha actualizado exitosamente');
      else alert('El registro se ha creado exitosamente');

      this.resetForm();
    },
  }));

  resetForm() {
    this.newMovie = {
      categories: [],
      imageUrl: '',
      overview: '',
      releaseDate: '',
      status: '0',
      time: '0',
      title: '',
      rating: '0',
      trailer: '',
    };
  }

  setMovieToEdit(movie: Movie) {
    this.newMovie.id = movie.id;
    this.newMovie.categories = movie.categories ?? [];
    this.newMovie.imageUrl = movie.imageUrl;
    this.newMovie.overview = movie.overview || '';
    this.newMovie.releaseDate = movie.releaseDate || '';
    this.newMovie.status = movie.status ? movie.status.id.toString() : '0';
    this.newMovie.time = movie.time;
    this.newMovie.title = movie.title;
    this.newMovie.rating = movie.rating || '0';
    this.newMovie.trailer = movie.trailer || '';
    this.edit = true;
  }
}
