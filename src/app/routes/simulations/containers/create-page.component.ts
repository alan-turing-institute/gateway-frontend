import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CaseSummary } from '../models/case';
import * as CaseSummaryActions from '../state/case-summary.actions';
import * as fromCase from '../state';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-simulations-create',
  template: `
    <page-header>
    CREATE
    </page-header>

    <sim-case-preview-list [loading]=loading [caseSummaries]="caseSummaries$ | async"></sim-case-preview-list>
  `,
  styles: [
    `
      :host ::ng-deep .ant-card-meta-title {
        margin-bottom: 12px;
      }
    `,
  ],
  // encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent implements OnInit {
  caseSummaries$: Observable<CaseSummary[]>;
  loading: boolean = false;

  constructor(
    private store: Store<fromCase.State>,
    public msg: NzMessageService,
  ) {
    this.caseSummaries$ = store.pipe(select(fromCase.getAllCaseSummaries));
  }

  ngOnInit() {
    this.store.dispatch(new CaseSummaryActions.Load());
  }
}
