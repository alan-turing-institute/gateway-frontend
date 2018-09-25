import { Component, OnInit, OnDestroy, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { JobSummary } from '../models/job';
import { SimulationService } from '../services/simulation.service';
import { MiddlewareService } from '@core/services/middleware.service';

@Component({
  selector: 'app-simulations-view',
  template: `
    <page-header></page-header>

    <nz-card>
      <sim-job-summary-list
        [loading]=loading
        [jobSummaries]="simulationService.jobSummaries$ | async"
        (select) = onSelect($event)
        (delete) = onDelete($event)>
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
export class ViewComponent implements OnInit, OnDestroy {
  jobSummaries$: Observable<JobSummary[]>;

  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public simulationService: SimulationService,
  ) {}

  ngOnInit() {
    this.simulationService.authRefresh();
  }

  ngOnDestroy() {
    this.simulationService.cancelAutoRefresh();
  }

  onSelect(id: string) {
    this.router.navigate(['/simulations', id]);
  }

  onDelete(id: string) {
    this.simulationService.deleteJob(id);
  }
}
