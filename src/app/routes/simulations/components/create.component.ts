import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

import { Case } from '@shared/models/case.model';


@Component({
  selector: 'app-simulations-create',
  templateUrl: './create.component.html',
  styles: [
    `
    :host ::ng-deep .ant-card-meta-title {
      margin-bottom: 12px;
    }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class SimulationsCreateComponent implements OnInit {

  cases: Case[];
  error: any;
  loading: boolean;

  constructor(
    public msg: NzMessageService
  ){ }

  ngOnInit() {
    this.showCases();
  }

  showCases() {

  }

}
