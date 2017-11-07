import './polyfills.ts';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import "../node_modules/clarity-icons/clarity-icons.min.css"
import "../node_modules/@webcomponents/custom-elements/custom-elements.min.js"
import "../node_modules/clarity-icons/clarity-icons.min.js"

import "../node_modules/clarity-ui/clarity-ui.min.css"

if (environment.production) {
  enableProdMode();
}

console.log("API set to", environment.apiRoot)

platformBrowserDynamic().bootstrapModule(AppModule);
