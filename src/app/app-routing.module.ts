import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'indiamap',
    loadChildren: () =>
      import('./indiamap/indiamap.module').then(
        (m) => m.IndiamapModule
      ),
  },
  {
    path: 'worldmap',
    loadChildren: () =>
      import('./worldmap/worldmap.module').then(
        (m) => m.WorldmapModule
      ),
  },
  {
    path: 'indiatimeline',
    loadChildren: () =>
      import('./india-timeline/india-timeline.module').then(
        (m) => m.IndiaTimelineModule
      ),
  },
  {
    path: 'tweets',
    loadChildren: () =>
      import('./tweets/tweets.module').then(
        (m) => m.TweetsModule
      ),
  },
  {
    path: 'videos',
    loadChildren: () =>
      import('./videos/videos.module').then(
        (m) => m.VideosModule
      ),
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery/gallery.module').then(
        (m) => m.GalleryModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
