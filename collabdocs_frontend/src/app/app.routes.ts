import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [() => import('./guards/auth.guard').then(m => m.AuthGuard)]
  },
  {
    path: 'editor/:id',
    loadComponent: () => import('./editor/editor.component').then(m => m.EditorComponent),
    canActivate: [() => import('./guards/auth.guard').then(m => m.AuthGuard)]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
