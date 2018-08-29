import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-403',
  template: `<exception type="403"
              desc="Sorry, you are not authorized to access this page."
              style="min-height: 500px; height: 80%;"
              >
              <button nz-button [nzType]="'primary'">回到首页</button>
            </exception>
            `,
  // templateUrl: './403.component.html',
})
export class Exception403Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
