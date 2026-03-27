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
import { Register } from './features/register/register';
import { guestGuard } from './guards/guest-guard';
import { Reviews } from './features/reviews/reviews';
import { Profile } from './features/profile/profile';
import { Memberships } from './features/memberships/memberships';
import { AdminCategories } from './features/admin-categories/admin-categories';
import { AdminEstablishments } from './features/admin-establishments/admin-establishments';
import { AdminMemberships } from './features/admin-memberships/admin-memberships';
import { AdminReviews } from './features/admin-reviews/admin-reviews';
import { AdminContacts } from './features/admin-contacts/admin-contacts';
import { AdminSchedules } from './features/admin-schedules/admin-schedules';
import { NewSchedule } from './features/new-schedule/new-schedule';
import { StablishmentSchedule } from './features/stablishment-schedule/stablishment-schedule';
import { SchedulesList } from './features/schedules-list/schedules-list';
import { PurchaseHistory } from './features/purchase-history/purchase-history';
import { ReportMovies } from './features/report-movies/report-movies';
import { ReportFinancial } from './features/report-financial/report-financial';
import { ReportUsers } from './features/report-users/report-users';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: AboutUs },
  { path: 'booking/:id', component: Bookings, canActivate: [authGuard] },
  { path: 'reviews/:id', component: Reviews, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'purchase-history', component: PurchaseHistory, canActivate: [authGuard] },
  { path: 'memberships', component: Memberships },
  { path: 'contact', component: ContactAdmin, canMatch: [matchContactGuard] },
  { path: 'contact', component: ContactUs },
  {
    path: 'panel',
    component: Movies,
    canActivateChild: [canActivateChildGuard],
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersList },
      { path: 'movies', component: RegisterMovie },
      { path: 'categories', component: AdminCategories },
      { path: 'establishments', component: AdminEstablishments },
      { path: 'memberships', component: AdminMemberships },
      { path: 'reviews', component: AdminReviews },
      { path: 'contacts', component: AdminContacts },
      {
        path: 'schedules',
        component: AdminSchedules,
        children: [
          { path: 'new', component: NewSchedule },
          { path: 'stablishments', component: StablishmentSchedule },
          { path: 'list', component: SchedulesList },
        ],
      },
      { path: 'movie-details', component: ReportMovies },
      { path: 'financial-details', component: ReportFinancial },
      { path: 'users-details', component: ReportUsers },
    ],
  },
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },

  { path: '**', component: NotFound },
];
