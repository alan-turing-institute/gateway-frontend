import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case, CaseSummary } from '../models/case';
import { environment } from '@env/environment';
import { MiddlewareService } from '@core/services/middleware.service';

@Injectable()
export class CaseService {
  public summaries$: Observable<CaseSummary[]>;

  constructor(private middlewareService: MiddlewareService) {
    this.summaries$ = this.middlewareService.getAllCaseSummaries();
  }
}
