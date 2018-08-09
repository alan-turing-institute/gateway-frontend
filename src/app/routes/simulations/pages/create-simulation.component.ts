import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Case, CaseSelection } from '../models/case';
import { CaseService } from '../services/case.service';
import { MiddlewareService } from '@core/services/middleware.service';

// <code>
//   {{caseObject | json}}
// </code>

@Component({
  selector: 'app-simulations-create',
  template: `

  <code>
  create-simulation.component.ts
  </code>

  <sim-case [caseObject]="caseObject"></sim-case>
  
  <button type="button" (click)="onCreate()">Create</button>

  `,
})
export class CreateSimulationComponent {
  caseObject: Case;
  caseSelection: CaseSelection;

  constructor(
    private router: Router,
    private caseService: CaseService,
    private route: ActivatedRoute,
  ) {
    this.caseSelection = new CaseSelection();
    this.caseSelection.author = 'example-author'; // mock placeholder for auth service

    route.params.pipe(map(params => params.id)).subscribe(id => {
      this.caseService.getCase(id).subscribe(caseObject => {
        this.caseObject = caseObject;
        this.caseSelection.case_id = id;
      });
    });
  }

  onCreate() {
    this.caseSelection.name = this.caseObject.name;
    console.log(this.caseObject, this.caseSelection);
    this.caseService.createJob(this.caseSelection).subscribe(response => {
      console.log('DEBUG(create-simulation) onCreate()', response);
      this.router.navigateByUrl(`/simulations/configure/${response['job_id']}`);
    });
  }
}
