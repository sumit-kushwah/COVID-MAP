import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from 'src/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { IndiamapComponent } from './indiamap/indiamap.component';
import { WorldmapComponent } from './worldmap/worldmap.component';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'indiamap', component: IndiamapComponent },
  { path: 'worldmap', component: WorldmapComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
