import { Component } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case } from '../models/case';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-simulations-configure',
  template: `
  <sim-case-configure [caseObject]="caseObject$ | async"></sim-case-configure>
  `,
})
export class ConfigureCasePageComponent {
  caseObject$: Observable<Case>;

  constructor(private caseService: CaseService, private route: ActivatedRoute) {
    // load the required Case observable
    route.params.pipe(map(params => params.id)).subscribe(id => {
      this.caseObject$ = caseService.getCase(id);
    });
  }
}
