import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from './home/home.module';
import { IndiamapModule } from './indiamap/indiamap.module';
import { WorldmapModule } from './worldmap/worldmap.module';
import { IndiaTimelineModule } from './india-timeline/india-timeline.module';
import { FooterModule } from './footer/footer.module';
import { TweetsModule } from './tweets/tweets.module';
import { GalleryModule } from './gallery/gallery.module';
import { NavModule } from './nav/nav.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    IndiamapModule,
    WorldmapModule,
    IndiaTimelineModule,
    FooterModule,
    TweetsModule,
    GalleryModule,
    NavModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
