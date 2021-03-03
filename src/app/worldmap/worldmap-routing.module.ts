import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorldmapComponent } from './worldmap.component';

const routes: Routes = [
  {
    path: '',
    component: WorldmapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorldMapRoutingModule { }
