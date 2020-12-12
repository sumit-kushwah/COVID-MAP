import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndiaTimelineComponent } from './india-timeline/india-timeline.component';
import { IndiamapComponent } from './indiamap/indiamap.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TweetsComponent } from './tweets/tweets.component';
import { WorldmapComponent } from './worldmap/worldmap.component';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'indiamap', component: IndiamapComponent },
  { path: 'worldmap', component: WorldmapComponent },
  { path: 'indiatimeline', component: IndiaTimelineComponent },
  { path: 'tweets', component: TweetsComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
