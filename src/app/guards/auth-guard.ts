import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('User is authenticated, access granted.');
    return true;
  }

  console.log('User is not authenticated, access denied. Redirecting to login page.');

  return router.parseUrl('/login');
};
