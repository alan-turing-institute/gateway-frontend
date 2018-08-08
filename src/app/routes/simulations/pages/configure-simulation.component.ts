import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Job } from '../models/job';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-simulations-configure',
  template: `

  <code>
    In configure-simulation.component.ts
  </code>


  <sim-job [job]="job"></sim-job>

  <div>
    <code>
      {{job | json}}
    </code>
  </div>



  <button type="button" (click)="onSave()">Save</button>

  `,
})
export class ConfigureSimulationComponent {
  job: Job;

  constructor(
    private caseService: CaseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    route.params.pipe(map(params => params.id)).subscribe(id => {
      this.caseService.getJob(id).subscribe(job => {
        this.job = job;
      });
    });
  }

  onSave() {
    console.log(this.job);
  }
}
