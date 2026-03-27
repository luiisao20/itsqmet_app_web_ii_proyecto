import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MovieService } from '../../service/movie-service';
import { Movie, Category } from '../../models/movie';
import { FormsModule } from '@angular/forms';
import { Button } from '../button/button';
import { MovieTable } from '../movie-table/movie-table';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { CategoryService } from '../../service/category-service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCloseCircleOutline } from '@ng-icons/ionicons';
import { formatDateForInput } from '../../helper/format-date-for-input.helper';

interface Status {
  id: string;
  name: string;
}

interface MovieModel {
  id?: number;
  categories: Category[];
  imageUrl: string;
  overview: string;
  releaseDate: string;
  status: string;
  time: string;
  title: string;
  rating: number;
  trailer: string;
  totalReviews: number;
}

@Component({
  selector: 'app-movie-form',
  imports: [FormsModule, Button, MovieTable, NgIcon],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css',
  providers: provideIcons({ ionCloseCircleOutline }),
})
export class MovieForm {
  private movieService = inject(MovieService);
  private queryClient = inject(QueryClient);
  private categoryService = inject(CategoryService);
  private cdr = inject(ChangeDetectorRef);

  newMovie: MovieModel = {
    categories: [],
    imageUrl: '',
    overview: '',
    releaseDate: '',
    status: '0',
    time: '0',
    title: '',
    rating: 0,
    trailer: '',
    totalReviews: 0,
  };
  edit: boolean = false;

  categoriesSelected = signal<Category[]>([]);

  queryCategory = injectQuery(() => ({
    queryKey: ['categories'],
    queryFn: () => this.categoryService.get(),
  }));

  statuses: Status[] = [
    {
      id: 'ESTRENO',
      name: 'Estreno',
    },
    {
      id: 'PROXIMAMENTE',
      name: 'Próximamente',
    },
  ];

  onDeselectCategory(item: Category) {
    this.categoriesSelected.update((prev) => prev.filter((c) => c.id !== item.id));
  }

  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedId = Number(selectElement.value);

    const item = this.queryCategory.data()?.find((c) => c.id === selectedId);

    if (item && !this.categoriesSelected().includes(item)) {
      this.categoriesSelected.update((prev) => [...prev, item]);
    }
  }

  mutation = injectMutation(() => ({
    mutationFn: () => {
      const release = new Date(this.newMovie.releaseDate).toISOString();
      const movieToSave: Movie = {
        id: this.newMovie.id,
        categories: this.categoriesSelected(),
        imageUrl: this.newMovie.imageUrl,
        overview: this.newMovie.overview,
        releaseDate: release,
        status: this.newMovie.status,
        time: this.newMovie.time,
        title: this.newMovie.title,
        rating: this.newMovie.rating,
        trailer: this.newMovie.trailer,
        totalReviews: this.newMovie.totalReviews,
      };
      if (this.newMovie.id) return this.movieService.putMovie(this.newMovie.id, movieToSave);
      return this.movieService.postMovie(movieToSave);
    },

    onError: (error) => {
      alert('Ha ocurrido un error');
    },

    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['movies'] });
      this.resetForm();
      this.cdr.detectChanges();
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
      rating: 0,
      trailer: '',
      totalReviews: 0
    };
  }

  setMovieToEdit(movie: Movie) {
    this.newMovie.id = movie.id;
    this.categoriesSelected.set(movie.categories ?? []);
    this.newMovie.imageUrl = movie.imageUrl;
    this.newMovie.overview = movie.overview || '';
    this.newMovie.releaseDate = formatDateForInput(movie.releaseDate!) || '';
    this.newMovie.status = movie.status!;
    this.newMovie.time = movie.time;
    this.newMovie.title = movie.title;
    this.newMovie.rating = movie.rating || 0;
    this.newMovie.trailer = movie.trailer || '';
    this.newMovie.totalReviews = movie.totalReviews || 0;
    this.edit = true;
  }
}
