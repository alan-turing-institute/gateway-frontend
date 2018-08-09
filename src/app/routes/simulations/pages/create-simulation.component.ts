import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, empty } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { Case, CaseSelection } from '../models/case';
import { JobPatch } from '../models/job';
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

  createPatch() {
    let patch: JobPatch = {
      name: this.caseObject.name,
      description: this.caseObject.description,
      values: this.values,
    };
    return patch;
  }

  onCreate() {
    this.caseSelection.name = this.caseObject.name;

    console.log(
      'DEBUG(create-simulation):',
      this.caseObject,
      this.caseSelection,
    );

    let patch = this.createPatch();
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
        console.log(res);
        this.router.navigateByUrl(`/simulations/configure/${database_job_id}`);
      });
  }
}
