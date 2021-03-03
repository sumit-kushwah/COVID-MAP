import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home-routing.module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'indiamap',
    loadChildren: () =>
      import('./indiamap/indiamap-routing.module').then(
        (m) => m.IndiaMapRoutingModule
      ),
  },
  {
    path: 'worldmap',
    loadChildren: () =>
      import('./worldmap/worldmap-routing.module').then(
        (m) => m.WorldMapRoutingModule
      ),
  },
  {
    path: 'indiatimeline',
    loadChildren: () =>
      import('./india-timeline/india-timeline-routing.module').then(
        (m) => m.IndiaTimelineRoutingModule
      ),
  },
  {
    path: 'tweets',
    loadChildren: () =>
      import('./tweets/tweets-routing.module').then(
        (m) => m.TweetsRoutingModule
      ),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery-routing.module').then(
        (m) => m.GalleryRoutingModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found-routing.module').then(
        (m) => m.PageNotFoundRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
