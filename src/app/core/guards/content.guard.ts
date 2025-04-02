import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const contentGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return !localStorage.getItem('jwtToken') || router.createUrlTree(['/inventario']);
};
