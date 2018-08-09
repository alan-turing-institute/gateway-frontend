import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Case, CaseSummary, CaseSelection } from '../models/case';
import { Job, JobPatch } from '../models/job';
import { Value } from '../models/value';

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

  updateJob(id: string, patch: JobPatch) {
    return this.middlewareService.patchJob(id, patch);
  }

  getJob(id: string): Observable<Job> {
    return this.middlewareService.getJob(id);
  }
}
