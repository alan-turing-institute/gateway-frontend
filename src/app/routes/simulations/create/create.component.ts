import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd';

import { SimulationsService } from '../simulations.service';
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
  encapsulation: ViewEncapsulation.Emulated,
  providers: [ SimulationsService ]
})
export class SimulationsCreateComponent implements OnInit {

  cases: Case[];
  error: any;
  loading: boolean;

  constructor(
    private simulationsService: SimulationsService,
    public msg: NzMessageService
  ){ }

  ngOnInit() {
    this.showCases();
  }

  showCases() {
    this.simulationsService.getCases()
      .subscribe(
        (data: any) => {
          this.cases = data;
          this.loading = false;
        }, // success path
        error => this.error = error // error path
     );
   }

}
