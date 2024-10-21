import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard'; 

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule), canActivate: [AuthGuard] }
];
