import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Case, CaseSelection } from '../models/case';
import { CaseComponent } from '../components/case.component';
import { Value } from '../models/value';
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

  <nz-card>
    <sim-case [caseObject]="caseObject"></sim-case>
    <button type="button" (click)="onCreate()">Create</button>
  </nz-card>

  <div>
    <code>
      {{values | json}}
    </code>
  </div>
  `,
})
export class CreateSimulationComponent {
  // inject the currently visible case, so that we can access any modified values
  @ViewChild(CaseComponent) private caseComponent: CaseComponent;

  caseObject: Case;
  caseSelection: CaseSelection;

  values: Value[];
  message: object[];

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

  ngAfterViewInit() {
    setTimeout(() => {
      this.values = this.caseComponent.values;
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
