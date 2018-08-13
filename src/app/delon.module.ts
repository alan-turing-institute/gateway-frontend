import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { throwIfAlreadyLoaded } from '@core/module-import-guard';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule, ReuseTabService, ReuseTabStrategy } from '@delon/abc';
import { DelonAuthModule } from '@delon/auth';
import { DelonACLModule } from '@delon/acl';
import { DelonCacheModule } from '@delon/cache';
import { DelonUtilModule } from '@delon/util';

import { environment } from '@env/environment';

import { AdPageHeaderConfig } from '@delon/abc';
export function pageHeaderConfig(): AdPageHeaderConfig {
  return Object.assign(new AdPageHeaderConfig(), { home_i18n: 'home' });
}

import { DelonAuthConfig } from '@delon/auth';
export function delonAuthConfig(): DelonAuthConfig {
  return Object.assign(new DelonAuthConfig(), <DelonAuthConfig>{
    login_url: '/passport/login',
  });
}

@NgModule({
  imports: [
    NgZorroAntdModule.forRoot(),
    AlainThemeModule.forRoot(),
    DelonABCModule.forRoot(),
    DelonAuthModule.forRoot(),
    DelonACLModule.forRoot(),
    DelonCacheModule.forRoot(),
    DelonUtilModule.forRoot(),
  ],
})
export class DelonModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: DelonModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'DelonModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DelonModule,
      providers: [
        // TIPS：If you do not need routing multiplexing, you need to remove the following code and template.`<reuse-tab></reuse-tab>`
        {
          provide: RouteReuseStrategy,
          useClass: ReuseTabStrategy,
          deps: [ReuseTabService],
        },
        // TIPS：@delon/abc global configuration
        // { provide: SimpleTableConfig, useFactory: simpleTableConfig }
        { provide: AdPageHeaderConfig, useFactory: pageHeaderConfig },
        { provide: DelonAuthConfig, useFactory: delonAuthConfig },
      ],
    };
  }
}
