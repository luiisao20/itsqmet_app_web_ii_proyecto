import { CanActivateChildFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../service/auth-service';

export const canActivateChildGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const rol = authService.currentRol();

  if (rol === null) return false;

  const path = childRoute.routeConfig?.path;

  if (path === 'movies' && rol === 'MODERATOR') return true;
  if (path === 'users' && rol === 'ADMIN') return true;

  return false;
};

//TODO: MODERATOR => CRUD DE PELICULAS
//TODO: ADMIND => CRUD DE USUARIOS
