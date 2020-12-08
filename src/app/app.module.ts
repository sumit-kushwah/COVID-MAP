import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndiaModule } from './india/india.module';
import { WorldModule } from './world/world.module';
import { HttpClientModule } from '@angular/common/http';
import { IndiamapComponent } from './indiamap/indiamap.component';

@NgModule({
  declarations: [
    AppComponent,
    IndiamapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IndiaModule,
    WorldModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
