import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { of, empty } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

import { Case } from '../models/case';
import { JobPatch } from '../models/job';
import { CaseComponent } from '../components/case.component';
import { Value } from '../models/value';
import { SimulationService } from '../services/simulation.service';
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

  `,
})
export class CreateSimulationComponent {
  caseObject: Case;

  message: object[];

  constructor(
    private router: Router,
    private simulationService: SimulationService,
    private route: ActivatedRoute,
  ) {
    route.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.simulationService.getCase(id)),
      )
      .subscribe(caseObject => {
        this.caseObject = caseObject;
        this.simulationService.activateCase(caseObject.id);
      });
  }

  onCreate() {
    let database_job_id: string = null;
    this.simulationService
      .createJob() // create job based on default spec values in case
      .pipe(
        map(res => res['job_id']),
        mergeMap(job_id => {
          database_job_id = job_id; // cache database job id for downstream navigateByUrl()
          return this.simulationService.updateJob(job_id); // patch any dirty spec values
        }),
      )
      .subscribe(res => {
        this.router.navigateByUrl(`/simulations/configure/${database_job_id}`);
      });
  }
}
