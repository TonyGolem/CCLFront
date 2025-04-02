import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { jwtOptionsProvider } from './core/services/auth/auth.config';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    jwtOptionsProvider,
    { provide: JwtHelperService, useClass: JwtHelperService },
    provideHttpClient((withInterceptors([authInterceptor]))),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
