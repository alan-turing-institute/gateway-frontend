import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Case } from '@shared/models/case.model';

@Injectable()
export class SimulationsService {

  caseUrl = `${environment.MIDDLEWARE_URL}/case`;
  jobUrl = `${environment.MIDDLEWARE_URL}/job`;

  case: string;

  constructor(
    private http: HttpClient
  ) { }

  getCases() {
    return this.http.get<Case[]>(this.caseUrl);
  }

  getJobs() {
    return this.http.get<any[]>(this.jobUrl);
  }

}
