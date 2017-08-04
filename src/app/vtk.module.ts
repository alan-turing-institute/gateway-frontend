import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VtkComponent } from './vtk/pipe/vtk.component';

import { CasesModule } from './cases/cases.module';
import { OutputModule } from './output/output.module';


@NgModule({
  imports: [
    CommonModule
    // CasesModule,
    // OutputModule
  ],
  declarations: [
    VtkComponent
  ],
  exports : [VtkComponent]
})
export class VtkModule { }
