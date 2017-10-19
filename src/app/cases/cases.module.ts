import { NgModule } from '@angular/core';
import { CasesRoutingModule } from './cases-routing.module';
import { CommonModule } from '@angular/common';

import { CasesComponent } from './cases.component';
import { CaseCardComponent } from './case/caseCard.component';
import { CasesService } from './cases.service';

@NgModule({
  imports: [
    CasesRoutingModule,
    CommonModule
  ],
  declarations: [
    CasesComponent,
    CaseCardComponent,
  ],
  providers: [
    CasesService
  ],
  exports: [CaseCardComponent]
})

export class CasesModule { }
