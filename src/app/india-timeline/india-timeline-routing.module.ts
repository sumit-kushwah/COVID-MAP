import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiaTimelineComponent } from './india-timeline.component';

const routes: Routes = [
  {
    path: '',
    component: IndiaTimelineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndiaTimelineRoutingModule { }
