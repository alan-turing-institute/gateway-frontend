import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseDescriptionComponent } from './caseDescription.component';
import { JobDescriptionComponent } from './jobDescription.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CaseDescriptionComponent,
    JobDescriptionComponent,
  ],
  exports : [CaseDescriptionComponent, JobDescriptionComponent]
})
export class DescriptionModule { }
