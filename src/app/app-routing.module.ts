import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'book/:id',
    loadChildren: () =>
      import('./pages/book-detail/book-detail.module').then((m) => m.BookDetailModule),
  },
  {
    path: 'wishlist',
    loadChildren: () =>
      import('./pages/wishlist/wishlist.module').then((m) => m.WishlistModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
