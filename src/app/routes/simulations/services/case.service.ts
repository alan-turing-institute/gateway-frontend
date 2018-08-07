import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case, CaseSummary, CaseSelection } from '../models/case';

import { environment } from '@env/environment';
import { MiddlewareService } from '@core/services/middleware.service';

@Injectable()
export class CaseService {
  public caseSummaries$: Observable<CaseSummary[]>;
  public cases: Case[];

  constructor(private middlewareService: MiddlewareService) {
    this.caseSummaries$ = this.middlewareService.getAllCaseSummaries();
  }

  getCase(id: string): Observable<Case> {
    return this.middlewareService.getCase(id);
  }

  createJob(caseSelection: CaseSelection): Observable<object> {
    return this.middlewareService.createJob(caseSelection);
  }
}
