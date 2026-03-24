import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isValid = await authService.checkAuthStatus();

  if (isValid) {
    return true;
  }

  return router.parseUrl('/login');
};
