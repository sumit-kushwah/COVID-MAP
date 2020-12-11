import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiaComponent } from './india.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [IndiaComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [IndiaComponent,]
})
export class IndiaModule { }
