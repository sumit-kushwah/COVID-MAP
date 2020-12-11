import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiaTimelineComponent } from './india-timeline.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [IndiaTimelineComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class IndiaTimelineModule { }
