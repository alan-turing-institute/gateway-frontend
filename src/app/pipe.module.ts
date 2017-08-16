import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeComponent } from './three/pipe/pipe.component';

import { CasesModule } from './cases/cases.module';
import { OutputModule } from './output/output.module';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PipeComponent
  ],
  exports : [PipeComponent]
})
export class PipeModule { }
