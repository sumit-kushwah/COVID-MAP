import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldComponent } from './world.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [WorldComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [WorldComponent,]
})
export class WorldModule { }
