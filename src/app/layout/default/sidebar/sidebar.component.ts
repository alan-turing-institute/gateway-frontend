import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';

// import { select, Store } from '@ngrx/store';
// import { Observable } from 'rxjs';

@Component({
  selector   : 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(public settings: SettingsService, public msgSrv: NzMessageService) {
  }
}
