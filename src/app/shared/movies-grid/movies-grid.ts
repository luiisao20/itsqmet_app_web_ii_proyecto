import { Component, Input } from '@angular/core';
import { MoviesCard } from '../movies-card/movies-card';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies-grid',
  imports: [MoviesCard],
  templateUrl: './movies-grid.html',
  styleUrl: './movies-grid.css',
})
export class MoviesGrid {
  movies: Movie[] = [
    {
      id: 1,
      title: 'Dune: Part Two',
      imageUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      category: 'Ciencia Ficción',
      time: '2h 46m',
    },
    {
      id: 2,
      title: 'Spider-Man: Across the Spider-Verse',
      imageUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
      category: 'Animación',
      time: '2h 20m',
    },
    {
      id: 3,
      title: 'Oppenheimer',
      imageUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      category: 'Drama',
      time: '3h 0m',
    },
    {
      id: 4,
      title: 'Guardians of the Galaxy Vol. 3',
      imageUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
      category: 'Acción',
      time: '2h 30m',
    },
  ];

  @Input() nowCard?: boolean;
}
