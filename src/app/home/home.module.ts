import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IndiaModule } from './india/india.module';
import { WorldModule } from './world/world.module';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    IndiaModule,
    WorldModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
