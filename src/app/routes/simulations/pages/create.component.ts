import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CaseSummary } from '../models/case';
import { SimulationService } from '../services/simulation.service';

@Component({
  selector: 'app-simulations-create',
  template: `
    <page-header></page-header>

    <sim-case-summary-list [loading]=loading [caseSummaries]="simulationService.caseSummaries$ | async"></sim-case-summary-list>
  `,
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
})
export class CreateComponent implements OnInit {
  caseSummaries$: Observable<CaseSummary[]>;

  loading: boolean = false;

  constructor(public simulationService: SimulationService) {
    this.caseSummaries$ = simulationService.caseSummaries$;
  }

  ngOnInit() {
    this.simulationService.refreshCaseSummaries();
  }
}
