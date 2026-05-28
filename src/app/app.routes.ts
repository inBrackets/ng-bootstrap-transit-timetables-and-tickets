import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'trains', pathMatch: 'full' },
  {
    path: 'trains',
    loadChildren: () => import('./features/trains/trains.routes').then(m => m.TRAINS_ROUTES)
  },
  {
    path: 'flights',
    loadChildren: () => import('./features/flights/flights.routes').then(m => m.FLIGHTS_ROUTES)
  },
  {
    path: 'buses',
    loadChildren: () => import('./features/buses/buses.routes').then(m => m.BUSES_ROUTES)
  },
  {
    path: 'basket',
    loadChildren: () => import('./features/basket/basket.routes').then(m => m.BASKET_ROUTES)
  }
];
