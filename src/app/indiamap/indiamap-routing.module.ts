import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndiamapComponent } from './indiamap.component';


const routes: Routes = [
  {
    path: '',
    component: IndiamapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndiaMapRoutingModule { }
