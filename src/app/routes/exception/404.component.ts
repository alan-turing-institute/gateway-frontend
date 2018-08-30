import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-404',
  template: `<exception type="404"
              desc="Sorry, this page could not be found."
              style="min-height: 500px; height: 80%;"
              >
              <ng-template #actions>
                <button nz-button [routerLink]="['/passport/login']" [nzType]="'primary'">Sign In</button>
              </ng-template>
            </exception>
            `,
})
export class Exception404Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
