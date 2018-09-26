import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { Job } from '../models/job';
import { SimulationService } from '../services/simulation.service';
import { ParametersComponent } from '@simulations/components/parameters.component';

@Component({
  selector: 'app-simulations-redirect',
  template: `
  <page-header></page-header>
  <app-configure-simulation *ngIf="configure" [job]="job"></app-configure-simulation>
  <app-view-simulation *ngIf="view" [job]="job"></app-view-simulation>
  `,
})
export class RedirectComponent implements OnInit {
  routeId: string;
  job: Job;
  private configure = false;
  private view = false;

  constructor(
    private simulationService: SimulationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeId = params['id'];
      this.initialiseState();
    });
  }

  initialiseState() {
    this.simulationService.getJob(this.routeId).subscribe(jobObject => {
      this.job = jobObject;
      this.simulationService.activateJob(jobObject);
      this.render(this.job.status);
    });
  }

  private render(status: string) {
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
