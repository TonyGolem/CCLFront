import { JwtModule, JwtConfig, JWT_OPTIONS } from '@auth0/angular-jwt';

export function tokenGetter(): string | null {
  return localStorage.getItem('jwtToken');
}

export const jwtOptionsProvider = {
  provide: JWT_OPTIONS,
  useValue: { tokenGetter }
};
