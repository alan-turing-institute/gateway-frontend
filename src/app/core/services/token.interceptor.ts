import { Injectable, Inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { TokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService, // @Inject() for singleton service
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (request.responseType == 'blob') {
      return next.handle(request);
    } else {
      let token = this.tokenService.get()['token'];

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(request);
    }
  }
}
