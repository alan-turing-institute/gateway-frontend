import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-403',
  template: `
  <exception type="403" [desc]="'Sorry, you don\\'t have access to this page.'">
    <button nz-button [routerLink]="['/passport/login']" [nzType]="'primary'">Sign In</button>
  </exception>`,
})
export class Exception403Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
