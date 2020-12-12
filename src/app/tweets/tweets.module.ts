import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetsComponent } from './tweets.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [TweetsComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
  ]
})
export class TweetsModule { }
