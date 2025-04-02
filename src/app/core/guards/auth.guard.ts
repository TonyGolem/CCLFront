import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = localStorage.getItem('jwtToken');

  if (!token || jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem('jwtToken');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
