import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Case, CaseSelection } from '../models/case';
import { CaseService } from '../services/case.service';
import { MiddlewareService } from '@core/services/middleware.service';

@Component({
  selector: 'app-simulations-configure',
  template: `

  <code>
    In configure-simulation.component.ts
  </code>

  <button type="button" (click)="onSave()">Save</button>

  `,
})
export class ConfigureSimulationComponent {
  // job: Job;

  constructor(
    private router: Router,
    private caseService: CaseService,
    private route: ActivatedRoute,
  ) {
    // route.params.pipe(map(params => params.id)).subscribe(id => {
    //   this.caseService.getCase(id).subscribe(caseObject => {
    //     this.caseObject = caseObject;
    //     this.caseSelection.case_id = id;
    //   });
    // });
  }

  onSave() {}
}
