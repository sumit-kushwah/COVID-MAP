import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent } from './tweets.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TweetsRoutingModule } from './tweets-routing.module';

@NgModule({
  declarations: [TweetsComponent],
  imports: [
    CommonModule,
    TweetsRoutingModule,
    NgxSpinnerModule,
  ]
})
export class TweetsModule { }
