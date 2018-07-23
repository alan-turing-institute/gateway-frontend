import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Case } from '../models/case';
import * as CaseActions from '../reducers/case.actions';
import * as fromCases from '../reducers';

import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-simulations-create',
  templateUrl: './create-page.component.html',
  styles: [
    `
    :host ::ng-deep .ant-card-meta-title {
      margin-bottom: 12px;
    }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,  // TODO
  changeDetection: ChangeDetectionStrategy.OnPush  // TODO
})
export class SimulationsCreateComponent implements OnInit {

  cases$: Observable<Case[]>;

  constructor(
    private store: Store<fromCases.State>,
    public msg: NzMessageService
  ){
    this.cases$ = store.pipe(select(fromCases.getAllCases));
  }

  ngOnInit() {
    this.store.dispatch(new CaseActions.Load());
  }

}
