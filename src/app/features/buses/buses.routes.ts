import { Routes } from '@angular/router';

// Buses microfrontend — entry point exposed to the shell
export const BUSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./buses').then(m => m.BusesComponent)
  }
];
