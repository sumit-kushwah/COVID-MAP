import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiaTimelineComponent } from './india-timeline.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IndiaTimelineRoutingModule } from './india-timeline-routing.module';



@NgModule({
  declarations: [IndiaTimelineComponent],
  imports: [
    CommonModule,
    IndiaTimelineRoutingModule,
    NgxSpinnerModule
  ]
})
export class IndiaTimelineModule { }
