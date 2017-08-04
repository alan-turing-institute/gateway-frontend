import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import {IonRangeSliderModule} from 'ng2-ion-range-slider';

import { OutputComponent } from './output.component';
import { OutputRoutingModule } from './output-routing.module';

import { OutputService } from './output.service';

@NgModule({
  imports: [
    OutputRoutingModule,
    // ChartsModule,
    FormsModule,
    IonRangeSliderModule,
    CommonModule
  ],
  declarations: [OutputComponent],
  providers : [OutputService]
})
export class OutputModule { }
