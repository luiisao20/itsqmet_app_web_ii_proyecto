import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { MovieService } from '../../service/movie-service';
import { Movie } from '../../models/movie';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { CustomDatePipe } from '../../pipes/custom-date-pipe';

@Component({
  selector: 'app-movie-table',
  imports: [NgIconComponent, CustomDatePipe],
  templateUrl: './movie-table.html',
  providers: provideIcons({ heroPencilSquare, heroTrash }),
  styleUrl: './movie-table.css',
})
export class MovieTable {
  @Output() selectMovieToEdit = new EventEmitter<Movie>();
  @Input() isForm: boolean = false;
  @Output() selectMovieForSchedule = new EventEmitter<Movie>();

  private movieService = inject(MovieService);
  private queryClient = inject(QueryClient);

  private mutation = injectMutation(() => ({
    mutationFn: (id: number) => this.movieService.deleteMovie(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({ queryKey: ['movies'] });
      alert('El registro se ha eliminado exitosamente');
    },
  }));

  query = injectQuery(() => ({
    queryKey: ['movies'],
    queryFn: () => this.movieService.getMovies(),
  }));

  deleteMovie(id: number) {
    if (confirm('¿Estás seguro de eliminar el registro?')) {
      this.mutation.mutate(id);
    }
  }

  onSelectMovieForSchedule(movie: Movie) {
    this.selectMovieForSchedule.emit(movie);
  }

  onSelectMovieToEdit(movie: Movie) {
    this.selectMovieToEdit.emit(movie);
  }
}
