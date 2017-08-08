import { NgModule } from '@angular/core';
import { CasesRoutingModule } from './cases-routing.module';
import { CommonModule } from '@angular/common';

import { CasesComponent } from './cases.component';
import { CaseCardComponent } from './case/caseCard.component';
import { CasesService } from './cases.service';

import { ChangeoverComponent } from './changeover.component';
// Components Routing
// import { FormsModule } from '@angular/forms';
// import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { AssembleComponent } from './assemble/assemble.component';
// import { JobDataService } from './assemble/jobData.service';
// import { VtkModule} from '../vtk.module';


@NgModule({
  imports: [
    CasesRoutingModule,
    CommonModule
    // FormsModule,
    // IonRangeSliderModule,
    // VtkModule
  ],
  declarations: [
    CasesComponent,
    CaseCardComponent,
    ChangeoverComponent,
    AssembleComponent
  ],
  providers: [
    CasesService
  ],
  exports: [CaseCardComponent]
})

export class CasesModule { }
