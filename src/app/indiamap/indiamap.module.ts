import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiamapComponent } from './indiamap.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [IndiamapComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [IndiamapComponent]
})
export class IndiamapModule { }
