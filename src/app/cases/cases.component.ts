import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseInfo } from '../types/caseInfo';
import { CasesService } from './cases.service';

@Component({
  providers: [CasesService],
  templateUrl: './cases.component.html',
  styleUrls:['cases.css']
})

export class CasesComponent implements OnInit {
	cases: CaseInfo[];
	errorMessage: string;
	numCasesMessage: string;

	constructor(private casesService:CasesService) { }

	ngOnInit():void {
			this.cases = []
			this.getCaseTypes()
			this.numCasesMessage = ""
	}

	getCaseTypes() {
			this.casesService.getCases()
				.subscribe(
						cases => {
							this.cases = cases
							if (this.cases.length == 0)
								this.numCasesMessage = "1 case found." 
							else
							this.numCasesMessage = this.cases.length +" cases found."
						},
						error => {
							this.errorMessage = <any> error
						}
				);
	}
}
