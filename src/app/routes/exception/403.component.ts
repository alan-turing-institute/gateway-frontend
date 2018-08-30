import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-403',
  template: `<exception type="403"
              desc="Sorry, you are not authorized to access this page."
              style="min-height: 500px; height: 80%;"
              >
              <ng-template #actions>
                <button nz-button [routerLink]="['/passport/login']" [nzType]="'primary'">Sign In</button>
              </ng-template>
            </exception>
            `,
})
export class Exception403Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
