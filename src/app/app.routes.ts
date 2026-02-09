import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { AboutUs } from './features/about-us/about-us';
import { Bookings } from './features/bookings/bookings';
import { ContactUs } from './features/contact-us/contact-us';
import { Movies } from './features/movies/movies';
import { NotFound } from './features/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: AboutUs },
  { path: 'booking', component: Bookings },
  { path: 'contact', component: ContactUs },
  { path: 'movies', component: Movies },

  { path: '**', component: NotFound },
];
