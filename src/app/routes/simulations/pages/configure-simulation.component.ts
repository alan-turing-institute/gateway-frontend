import {
  Component,
  Input,
  ViewChild,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { NzNotificationService } from 'ng-zorro-antd';

import { Job } from '../models/job';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-configure-simulation',
  templateUrl: './configure-simulation.component.html',
})
export class ConfigureSimulationComponent implements OnInit {
  @Input()
  job: Job;
  @ViewChild('template')
  notificationTemplate: TemplateRef<{}>;

  constructor(
    private simulationService: SimulationService,
    private notificationService: NzNotificationService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onSave() {
    this.simulationService.updateJob(this.job.id).subscribe(res => {});
  }

  onCancel() {
    this.notificationService.remove(null);
  }

  onRun() {
    // create notification
    const notification = this.notificationService.template(
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
