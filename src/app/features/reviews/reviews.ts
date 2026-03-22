import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../service/review-service';
import { MovieService } from '../../service/movie-service';
import { Review } from '../../models/review';
import { Movie } from '../../models/movie';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionArrowBack, ionStar, ionStarOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-reviews',
  imports: [FormsModule, NgIconComponent, RouterLink],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css',
  providers: [provideIcons({ ionArrowBack, ionStar, ionStarOutline })],
})
export class Reviews {
  private route = inject(ActivatedRoute);
  private reviewService = inject(ReviewService);
  private movieService = inject(MovieService);

  movie = signal<Movie | null>(null);
  reviews = signal<Review[]>([]);
  loading = signal(true);
  submitting = signal(false);

  title = '';
  description = '';
  rating = 0;
  hoverRating = 0;

  private userUuid = localStorage.getItem('uuid') ?? '';
  private movieId = 0;

  hasReviewed = computed(() =>
    this.reviews().some((r) => r.user?.uuid === this.userUuid),
  );

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieId = parseInt(id);
      this.movieService.getMovieById(this.movieId).subscribe((movie) => {
        this.movie.set(movie);
      });
      this.loadReviews();
    }
  }

  loadReviews() {
    this.loading.set(true);
    this.reviewService.getReviewsByMovie(this.movieId).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  setRating(value: number) {
    this.rating = value;
  }

  submitReview() {
    if (!this.title.trim() || !this.description.trim() || this.rating === 0) {
      alert('Completa todos los campos y selecciona una calificación');
      return;
    }

    const review: Review = {
      title: this.title,
      description: this.description,
      rating: this.rating,
      movie: { id: this.movieId },
      user: { uuid: this.userUuid },
    };

    this.submitting.set(true);
    this.reviewService.saveReview(review).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.rating = 0;
        this.submitting.set(false);
        this.loadReviews();
      },
      error: () => {
        alert('Ha ocurrido un error al guardar la reseña');
        this.submitting.set(false);
      },
    });
  }

  starsArray = [1, 2, 3, 4, 5];
}