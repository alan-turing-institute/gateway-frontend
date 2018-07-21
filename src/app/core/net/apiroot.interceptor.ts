import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

// prepend API root to each http url
@Injectable()
export class ApiRootInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `http://localhost:5000/${req.url}` });
    return next.handle(apiReq);
  }
}
