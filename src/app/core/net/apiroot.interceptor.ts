import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '@env/environment';

// prepend API root to each http url
@Injectable()
export class ApiRootInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `${environment.MIDDLEWARE_URL}/${req.url}` });
    return next.handle(apiReq);
  }
}
