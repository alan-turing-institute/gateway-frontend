import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { Case } from '../models/case';

@Component({
  selector: 'sim-case-preview-list',
  templateUrl: 'case-preview-list.component.html',
  styles: [
    `
    :host ::ng-deep .ant-card-meta-title {
      margin-bottom: 12px;
    }
  `,
  ],
})
export class CasePreviewListComponent {

  constructor(public msg: NzMessageService) { }

  @Input() cases: Case[];
  @Input() loading: boolean;
}
