import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorldmapComponent } from './worldmap.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WorldMapRoutingModule } from './worldmap-routing.module';



@NgModule({
  declarations: [WorldmapComponent],
  imports: [
    CommonModule,
    WorldMapRoutingModule,
    NgxSpinnerModule,
  ]
})
export class WorldmapModule { }
