import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job } from '../models/job';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-redirect',
  template: `
  <app-configure-simulation *ngIf="configure" [job]="job"></app-configure-simulation>
  <app-view-simulation *ngIf="view" [job]="job"></app-view-simulation>
  `,
})
export class RedirectComponent {
  job: Job;
  private configure = false;
  private view = false;

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
        this.redirect(this.job.status);
      });
  }

  private redirect(status: string) {
    switch (status) {
      case 'Not Started': {
        this.configure = true;
        this.view = false;
        break;
      }
      default: {
        this.configure = false;
        this.view = true;
        break;
      }
    }
  }
}
