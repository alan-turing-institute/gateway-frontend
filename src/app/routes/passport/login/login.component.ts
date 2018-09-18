import { Component, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ACLService } from '@delon/acl';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { SettingsService } from '@delon/theme';
import { ReuseTabService } from '@delon/abc';
import { AuthService } from '@core/services/auth.service';
import { User } from '@core/models/user';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class UserLoginComponent {
  form: FormGroup;
  error = null;
  loading = false;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalService: NzModalService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService, // @Inject() for singleton service
    private settingsService: SettingsService,
    private authService: AuthService,
    private aclService: ACLService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
      remember: [true],
    });
    modalService.closeAll();
  }

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }

  submit() {
    this.error = '';
    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) return;

    this.loading = true;

    let user: User = {
      username: this.userName.value,
      password: this.password.value,
    };

    this.authService
      .login(user)
      .pipe(catchError(this.handleError()))
      .subscribe(response => {
        this.reuseTabService.clear();
        this.tokenService.set({
          token: response['auth_token'],
          name: this.userName.value,
          time: +new Date(),
        });

        this.settingsService.setUser({ name: this.userName.value });
        this.aclService.set({ role: ['user'] });
        this.router.navigate(['/simulations/create']);
      });
  }

  private handleError() {
    return (err: any) => {
      this.error = 'Incorrect username or password!';
      this.loading = false;
      return throwError(err);
    };
  }
}
