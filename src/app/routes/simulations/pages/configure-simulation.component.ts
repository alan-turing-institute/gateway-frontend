import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job, JobPatch } from '../models/job';
import { Value } from '../models/value';
import { JobComponent } from '../components/job.component';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-configure',
  template: `

  <nz-card>
    <sim-job [job]="job"></sim-job>
    <button nz-button nzType="primary" (click)="onSave()">Save</button>
    <button nz-button nzType="primary" (click)="onRun()">Run</button>
  </nz-card>
  
  `,
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
})
export class ConfigureSimulationComponent {
  job: Job;

  constructor(
    private simulationService: SimulationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.params
      .pipe(
        map(params => params.id),
        switchMap(id => this.simulationService.getJob(id)),
      )
      .subscribe(jobObject => {
        this.job = jobObject;
        this.simulationService.activateJob(jobObject);
      });
  }

  onSave() {
    this.simulationService.updateJob(this.job.id).subscribe(response => {
      console.log(response);
    });
  }

  onRun() {
    // TODO check for dirty changes and prompt onSave()
    this.simulationService.startJob(this.job.id).subscribe(response => {
      console.log(response);
      this.router.navigate(['/simulations/view']);
    });
  }
}
