import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'facts-page',
        loadComponent: () =>
          import('./components/facts-page/facts-page.component').then(
            (c) => c.FactsPageComponent
          ),
      },
      {
        path: 'favorites-page',
        loadComponent: () =>
          import('./components/favorite-page/favorite-page.component').then(
            (c) => c.FavoritePageComponent
          ),
      },
    ],
  },
];
