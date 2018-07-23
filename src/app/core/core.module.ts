import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import { I18NService } from './i18n/i18n.service';
import { RawHttpClient } from './startup/vanilla.service';
import { MiddlewareService } from './services/middleware.service';

@NgModule({
  providers: [
    I18NService,
    RawHttpClient,
    MiddlewareService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
