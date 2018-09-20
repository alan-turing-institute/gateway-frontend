import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'exception-404',
  template: `
  <exception type="404" [desc]="'Sorry, this page could not be found.'">
    <button nz-button [routerLink]="['/passport/login']" [nzType]="'primary'">Sign In</button>
  </exception>
  `,
})
export class Exception404Component {
  constructor(modalSrv: NzModalService) {
    modalSrv.closeAll();
  }
}
