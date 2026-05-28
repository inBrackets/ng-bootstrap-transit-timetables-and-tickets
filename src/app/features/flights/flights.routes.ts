import { Routes } from '@angular/router';

// Flights microfrontend — entry point exposed to the shell
export const FLIGHTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./flights').then(m => m.FlightsComponent)
  }
];
