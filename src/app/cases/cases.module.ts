import { NgModule } from '@angular/core';
import { CasesRoutingModule } from './cases-routing.module';
import { CommonModule } from '@angular/common';
import { ClarityModule } from "clarity-angular";

import { CasesComponent } from './cases.component';
import { CaseCardComponent } from './case/caseCard.component';
import { CasesService } from './cases.service';

@NgModule({
  imports: [
    CasesRoutingModule,
    CommonModule,
    ClarityModule.forRoot()
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
