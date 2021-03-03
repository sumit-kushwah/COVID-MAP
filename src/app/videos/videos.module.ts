import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideosComponent } from './videos.component';
import { VideosRoutingModule } from './videos-routing.module';
import { VideoItemModule } from './video-item/video-item.module';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [VideosComponent],
  imports: [
    CommonModule,
    VideoItemModule,
    FormsModule,
    VideosRoutingModule,
  ],
})
export class VideosModule { }
