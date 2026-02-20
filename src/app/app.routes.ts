import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { AboutUs } from './features/about-us/about-us';
import { Bookings } from './features/bookings/bookings';
import { ContactUs } from './features/contact-us/contact-us';
import { Movies } from './features/movies/movies';
import { NotFound } from './features/not-found/not-found';
import { canActivateChildGuard } from './guards/can-activate-child-guard';
import { RegisterMovie } from './features/register-movie/register-movie';
import { UsersList } from './features/users-list/users-list';
import { authGuard } from './guards/auth-guard';
import { Login } from './features/login/login';
import { ContactAdmin } from './features/contact-admin/contact-admin';
import { matchContactGuard } from './guards/match-contact-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: AboutUs },
  { path: 'booking', component: Bookings, canActivate: [authGuard] },
  { path: 'contact', component: ContactAdmin, canMatch: [matchContactGuard] },
  { path: 'contact', component: ContactUs },
  {
    path: 'panel',
    component: Movies,
    canActivateChild: [canActivateChildGuard],
    canActivate: [authGuard],
    children: [
      {
        path: 'movies',
        component: RegisterMovie,
      },
      {
        path: 'users',
        component: UsersList,
      },
    ],
  },
  { path: 'login', component: Login },

  { path: '**', component: NotFound },
];
