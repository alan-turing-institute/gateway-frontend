import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SettingsService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

import { AuthService } from '@core/services/auth.service';
import { SimulationService } from '@simulations/services/simulation.service';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-user mr-sm"></i>Account</div>
      <div nz-menu-item [nzDisabled]="true"><i class="anticon anticon-setting mr-sm"></i>Settings</div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i class="anticon anticon-setting mr-sm"></i>Sign out</div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {
  error = null;

  constructor(
    public settings: SettingsService,
    private aclService: ACLService,
    private authService: AuthService,
    private router: Router,
    public simulationService: SimulationService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    // register logout with auth service
    this.authService
      .logout()
      .pipe(catchError(this.handleError()))
      .subscribe(response => {
        this.simulationService.cancelRefresh();
        this.tokenService.clear();
        this.aclService.removeRole(['user']);
        this.router.navigateByUrl(this.tokenService.login_url);
      });
  }

  private handleError() {
    return (err: any) => {
      this.error = 'Error logging out.';
      return throwError(err);
    };
  }
}
