import { Routes } from '@angular/router';

// Trains microfrontend — entry point exposed to the shell
export const TRAINS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./trains').then(m => m.TrainsComponent)
  }
];
