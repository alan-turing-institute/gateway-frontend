import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CaseSummary } from '../models/case';
import { SimulationService } from '../services/simulation.service';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-simulations-create',
  template: `
    <page-header>
    CREATE
    </page-header>

    <sim-case-summary-list [loading]=loading [caseSummaries]="caseSummaries$ | async"></sim-case-summary-list>
  `,
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
  // encapsulation: ViewEncapsulation.Emulated,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  caseSummaries$: Observable<CaseSummary[]>;

  loading: boolean = false;

  constructor(
    public msg: NzMessageService,
    private simulationService: SimulationService,
  ) {
    this.caseSummaries$ = simulationService.caseSummaries$;
  }

  ngOnInit() {}
}
