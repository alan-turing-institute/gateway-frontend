import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { map, mergeMap, switchMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

import { Case } from '../models/case';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-create',
  template: `

  <nz-card>
    <sim-simulation 
      [simulation]="caseObject"
      (save)="onSave()"
      (run)="onRun()">
    </sim-simulation>
  </nz-card>

  `,
})
export class CreateSimulationComponent {
  caseObject: Case;

  message: object[];

  constructor(
    private router: Router,
    private simulationService: SimulationService,
    private route: ActivatedRoute,
    public msg: NzMessageService,
  ) {
    route.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.simulationService.getCase(id)),
      )
      .subscribe(caseObject => {
        this.simulationService.activateCase(caseObject);
        this.caseObject = caseObject;
      });
  }

  onSave() {
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

  onRun() {
    let database_job_id: string = null;
    this.simulationService
      .createJob() // create job based on default spec values in case
      .pipe(
        map(res => res['job_id']),
        mergeMap(job_id => {
          database_job_id = job_id; // cache database job id for downstream navigateByUrl()
          return this.simulationService.updateJob(job_id); // patch any dirty spec values
        }),
        mergeMap(res => this.simulationService.startJob(database_job_id)),
      )
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl(`/simulations/view`);
      });
  }
}
