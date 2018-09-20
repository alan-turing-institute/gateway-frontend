import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd';

import { Job } from '../models/job';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-configure',
  templateUrl: './configure-simulation.component.html',
})
export class ConfigureSimulationComponent {
  job: Job;
  @ViewChild('template')
  notificationTemplate: TemplateRef<{}>;

  constructor(
    private simulationService: SimulationService,
    private notificationService: NzNotificationService,
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

  onCancel() {
    console.log('DEBUG(configure-simulation.component)');
    this.notificationService.remove(null);
  }

  onRun() {
    // create notification
    let notification = this.notificationService.template(
      this.notificationTemplate,
      { nzDuration: 0 },
    );

    setTimeout(() => this.router.navigate(['/simulations/view'])); // navigate to table

    this.simulationService.startJob(this.job.id).subscribe(res => {
      this.notificationService.remove(notification.messageId); // remove notification
      this.simulationService.refreshJobSummaries(); // refresh view table
    });
  }
}
