import { Routes } from '@angular/router';

// Basket microfrontend — entry point exposed to the shell
export const BASKET_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./basket').then(m => m.BasketComponent)
  }
];
