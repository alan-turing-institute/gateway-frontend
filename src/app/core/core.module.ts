import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { TokenInterceptor } from './services/token.interceptor';

import { I18NService } from './i18n/i18n.service';
import { RawHttpClient } from './startup/vanilla.service';
import { MiddlewareService } from './services/middleware.service';
import { AuthService } from './services/auth.service';

@NgModule({
  providers: [
    I18NService,
    RawHttpClient,
    MiddlewareService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
