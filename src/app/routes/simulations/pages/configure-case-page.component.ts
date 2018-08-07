import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { Case } from '../models/case';
import { CaseService } from '../services/case.service';

@Component({
  selector: 'app-simulations-configure',
  template: `
  <sim-case [caseObject]="caseObject"></sim-case>

  <code>
    {{caseObject | json}}
  </code>
  `,
})
export class ConfigureCasePageComponent {
  caseObject: Case;

  constructor(private caseService: CaseService, private route: ActivatedRoute) {
    route.params.pipe(map(params => params.id)).subscribe(id => {
      this.caseService.getCase(id).subscribe(caseObject => {
        this.caseObject = caseObject;
      });
    });
  }
}
