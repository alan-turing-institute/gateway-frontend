import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { map, mergeMap, switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd';

import { Case } from '../models/case';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-create-simulation',
  templateUrl: './create-simulation.component.html',
})
export class CreateSimulationComponent {
  caseObject: Case;
  @ViewChild('template')
  notificationTemplate: TemplateRef<{}>;

  constructor(
    private router: Router,
    private simulationService: SimulationService,
    private notificationService: NzNotificationService,
    private route: ActivatedRoute,
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
    // create notification
    let notification = this.notificationService.template(
      this.notificationTemplate,
      { nzDuration: 0 },
    );

    setTimeout(() => this.router.navigate(['/simulations/view'])); // navigate to table

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
        this.notificationService.remove(notification.messageId); // remove notification
        this.simulationService.refreshJobSummaries(); // refresh view table
      });
  }
}
