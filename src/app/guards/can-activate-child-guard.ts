import { CanActivateChildFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const rol = authService.currentRol();

  if (rol === null) return false;

  // ADMIN y MODERATOR tienen acceso a todo el panel
  if (rol === 'ROLE_ADMIN' || rol === 'ROLE_MODERATOR') return true;

  return false;
};
