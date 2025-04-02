import { Routes } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth/auth.component';
import { InventarioComponent } from './core/components/content/inventario/inventario.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'inventario', component: InventarioComponent,
    // canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }];
