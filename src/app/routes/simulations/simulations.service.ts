import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class SimulationsService {

  caseUrl = 'http://localhost:5000/case';
  jobUrl = 'http://localhost:5000/job';

  constructor(private http: HttpClient) { }

  getCases() {
    return this.http.get<any>(this.caseUrl);
  }

  getJobs() {
    return this.http.get<any>(this.jobUrl);
  }

}
