import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const matchContactGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const rol = authService.currentRol();

  if (rol === 'MODERATOR') return true;

  return false;
};
