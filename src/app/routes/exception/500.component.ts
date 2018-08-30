import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-500',
  template: `<exception type="500"
              desc="Sorry, an internal server error has occurred."
              style="min-height: 500px; height: 80%;"
              >
              <ng-template #actions>
                <button nz-button [routerLink]="['/passport/login']" [nzType]="'primary'">Sign In</button>
              </ng-template>
            </exception>
            `,
})
export class Exception500Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
