import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job } from '../models/job';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-configure',
  template: `

  <nz-card>
    <sim-simulation 
      [simulation]="job"
      (save)="onSave()"
      (run)="onRun()">
    </sim-simulation>
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
