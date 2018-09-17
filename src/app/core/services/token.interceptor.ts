import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { environment } from '@env/environment';

import { Observable } from 'rxjs/Observable';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private tokenBypass = environment.tokenBypass;

  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService, // @Inject() for singleton service
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // skip interceptor based on specified url fragments
    // for example: interceptor should not apply tokens for storage calls
    // as substitute tokens already appear as url query parameters

    let urlSkip = false;
    this.tokenBypass.forEach(fragment => {
      if (request.url.includes(fragment)) {
        urlSkip = true;
      }
    });

    if (urlSkip) {
      return next.handle(request);
    }

    let token = this.tokenService.get()['token'];
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(request);
  }
}
