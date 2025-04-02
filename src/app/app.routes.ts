import { Routes } from '@angular/router';
import { AuthComponent } from './core/components/auth/auth/auth.component';
import { InventarioComponent } from './core/components/content/inventario/inventario.component';
import { authGuard } from './core/guards/auth.guard';
import { contentGuard } from './core/guards/content.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent, canActivate: [contentGuard] },
  {
    path: 'inventario', component: InventarioComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'auth' }];
