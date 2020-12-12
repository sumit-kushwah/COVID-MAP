import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldmapComponent } from './worldmap.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [WorldmapComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ]
})
export class WorldmapModule { }
