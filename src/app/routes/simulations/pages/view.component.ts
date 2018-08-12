import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { JobSummary } from '../models/job';
import { SimulationService } from '../services/simulation.service';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-simulations-view',
  template: `
    <page-header>
    VIEW
    </page-header>

    <nz-card>
      <sim-job-summary-list 
        [loading]=loading 
        [jobSummaries]="jobSummaries$ | async"
        (configure) = onConfigure($event)
        (view) = onView($event)>
      </sim-job-summary-list>
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
export class ViewComponent implements OnInit {
  jobSummaries$: Observable<JobSummary[]>;

  loading: boolean = false;

  constructor(
    public msg: NzMessageService,
    private router: Router,
    private simulationService: SimulationService,
  ) {
    this.jobSummaries$ = simulationService.jobSummaries$;
  }

  ngOnInit() {}

  onView(id: string) {
    this.router.navigate(['/simulations/view', id]);
  }

  onConfigure(id: string) {
    this.router.navigate(['/simulations/configure', id]);
  }
}
