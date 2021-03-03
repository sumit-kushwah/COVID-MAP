import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoItemComponent } from './video-item.component';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [VideoItemComponent, SafePipe],
  imports: [
    CommonModule,
  ],
  exports: [VideoItemComponent]
})
export class VideoItemModule { }
