import { NgModule } from '@angular/core';
import { AssembleRoutingModule } from './assemble-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AssembleComponent } from './assemble.component';
import { JobDataService } from './jobData.service';
import { VtkModule} from '../../vtk.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonRangeSliderModule,
    VtkModule
  ],
  declarations: [
    AssembleComponent
  ],
  providers: [
    JobDataService
  ],
  exports: [AssembleComponent]
})

export class AssembleModule { }