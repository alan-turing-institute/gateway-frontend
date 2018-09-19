import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job } from '../models/job';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-configure',
  template: `

  <page-header></page-header>

  <nz-card>
    <sim-simulation 
      [simulation]="job"
      (save)="onSave()"
      (run)="onRun()">
    </sim-simulation>
  </nz-card>
  
  `,
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
    this.simulationService.updateJob(this.job.id).subscribe(res => {});
  }

  onRun() {
    this.simulationService.startJob(this.job.id).subscribe(res => {
      this.router.navigate(['/simulations/view']);
    });
  }
}
