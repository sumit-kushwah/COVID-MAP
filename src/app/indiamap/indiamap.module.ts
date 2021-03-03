import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiamapComponent } from './indiamap.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IndiaMapRoutingModule } from './indiamap-routing.module';
@NgModule({
  declarations: [IndiamapComponent],
  imports: [
    CommonModule,
    IndiaMapRoutingModule,
    NgxSpinnerModule
  ],
  exports: [IndiamapComponent]
})
export class IndiamapModule { }
