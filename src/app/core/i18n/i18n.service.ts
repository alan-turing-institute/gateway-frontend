import { Injectable, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { en_US, NzI18nService } from 'ng-zorro-antd';
import * as df_en from 'date-fns/locale/en';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService, AlainI18NService } from '@delon/theme';

@Injectable()
export class I18NService implements AlainI18NService {
  private _default = 'en';
  private change$ = new BehaviorSubject<string>(null);

  private _langs = [{ code: 'en', text: 'English' }];

  constructor(
    settings: SettingsService,
    private nzI18nService: NzI18nService,
    private translate: TranslateService,
    private injector: Injector,
  ) {
    const defaultLan = settings.layout.lang || translate.getBrowserLang();
    const lans = this._langs.map(item => item.code);
    this._default = lans.includes(defaultLan) ? defaultLan : lans[0];
    translate.addLangs(lans);
    this.setZorro(this._default).setDateFns(this._default);
  }

  setZorro(lang: string): this {
    this.nzI18nService.setLocale(en_US);
    return this;
  }

  setDateFns(lang: string): this {
    (window as any).__locale__ = df_en;
    return this;
  }

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter(w => w != null));
  }

  use(lang: string): void {
    lang = lang || this.translate.getDefaultLang();
    if (this.currentLang === lang) return;
    this.setZorro(lang).setDateFns(lang);
    this.translate.use(lang).subscribe(() => this.change$.next(lang));
  }
  getLangs() {
    return this._langs;
  }

  fanyi(key: string) {
    return this.translate.instant(key);
  }

  get defaultLang() {
    return this._default;
  }

  get currentLang() {
    return (
      this.translate.currentLang ||
      this.translate.getDefaultLang() ||
      this._default
    );
  }
}
