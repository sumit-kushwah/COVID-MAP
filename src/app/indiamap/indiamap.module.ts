import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndiamapComponent } from './indiamap.component';

import { A11yModule } from '@angular/cdk/a11y';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [IndiamapComponent],
  imports: [
    A11yModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [IndiamapComponent]
})
export class IndiamapModule { }
