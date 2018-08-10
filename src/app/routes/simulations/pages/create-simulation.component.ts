import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, empty } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

import { Case, CaseSelection } from '../models/case';
import { JobPatch } from '../models/job';
import { CaseComponent } from '../components/case.component';
import { Value } from '../models/value';
import { CaseService } from '../services/case.service';
import { MiddlewareService } from '@core/services/middleware.service';
import { identifierModuleUrl } from '@angular/compiler';

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
      Name: {{caseObject?.name}} Description: {{caseObject?.description}}
    </code>
  </div>

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
    route.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.caseService.getCase(id)),
      )
      .subscribe(caseObject => {
        this.caseObject = caseObject;
        this.caseSelection = this.selectCase(caseObject.id);
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.values = this.caseComponent.values;
    });
  }

  selectCase(id: string) {
    let selection = new CaseSelection();
    selection.author = 'example-author'; // mock placeholder for auth service
    selection.case_id = id;
    return selection;
  }

  jobPatch() {
    let patch: JobPatch = {
      name: this.caseObject.name,
      description: this.caseObject.description,
      values: this.values,
    };
    return patch;
  }

  onCreate() {
    this.caseSelection.name = this.caseObject.name;

    let patch = this.jobPatch();
    let database_job_id: string = null;

    this.caseService
      .createJob(this.caseSelection)
      .pipe(
        map(res => res['job_id']),
        mergeMap(job_id => {
          database_job_id = job_id; // cache database job id for downstream navigation
          return this.caseService.updateJob(job_id, patch);
        }),
      )
      .subscribe(res => {
        this.router.navigateByUrl(`/simulations/configure/${database_job_id}`);
      });
  }
}
