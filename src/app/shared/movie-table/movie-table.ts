import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { MovieService } from '../../service/movie-service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-table',
  imports: [NgIconComponent],
  templateUrl: './movie-table.html',
  providers: provideIcons({ heroPencilSquare, heroTrash }),
  styleUrl: './movie-table.css',
})
export class MovieTable {
  @Output() selectMovieToEdit = new EventEmitter<Movie>();

  private movieService = inject(MovieService);

  movies = signal<Movie[]>([]);

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => this.movies.set(data));
  }

  deleteMovie(id: string) {
    if (confirm('¿Estás seguro de eliminar el registro?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        alert('La pelicula se ha eliminado con exito');
        this.getMovies();
      });
    }
  }

  onSelectMovieToEdit(movie: Movie) {
    this.selectMovieToEdit.emit(movie);
  }
}
