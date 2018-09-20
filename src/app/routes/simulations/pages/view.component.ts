import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';

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
        (configure) = onConfigure($event)
        (view) = onView($event)
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
export class ViewComponent implements OnInit {
  jobSummaries$: Observable<JobSummary[]>;

  loading: boolean = false;
  private timerSubscription: AnonymousSubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private simulationService: SimulationService,
  ) {
    this.authRefresh();
  }

  ngOnInit() {
    this.simulationService.refreshJobSummaries();
  }

  onView(id: string) {
    this.router.navigate(['/simulations/view', id]);
  }

  onConfigure(id: string) {
    this.router.navigate(['/simulations/configure', id]);
  }

  onDelete(id: string) {
    this.simulationService.deleteJob(id);
  }

  private authRefresh(): void {
    let interval = 10000;
    this.timerSubscription = timer(0, interval).subscribe(() =>
      this.simulationService.refreshJobSummaries(),
    );
  }
}
