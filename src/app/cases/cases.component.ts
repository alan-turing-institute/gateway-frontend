import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CaseInfo} from './case/caseInfo';
import { CasesService } from './cases.service';

@Component({
//   selector: 'cases',
  providers: [CasesService],
  templateUrl: './cases.component.html',
})

export class CasesComponent implements OnInit {

    cases: CaseInfo[];
    errorMessage: string;

    constructor(private casesService:CasesService) { }

    ngOnInit():void {
        this.cases = []
        this.getCaseTypes()
    }

    getCaseTypes() {
        this.casesService.data
                            .subscribe(
                                cases => {
                                    this.cases = cases
                                    console.log(this.cases)
                                },
                                error => {
                                    this.errorMessage = <any> error
                                }
                            );
    }

}
