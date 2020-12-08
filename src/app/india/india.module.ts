import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiaComponent } from './india.component';



@NgModule({
  declarations: [IndiaComponent],
  imports: [
    CommonModule
  ],
  exports: [IndiaComponent,]
})
export class IndiaModule { }
