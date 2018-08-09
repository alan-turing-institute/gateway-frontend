import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';

import { Case, CaseSummary, CaseSelection } from '@simulations/models/case';
import { Job, JobPatch } from '@simulations/models/job';
import { environment } from '@env/environment';

@Injectable()
export class MiddlewareService {
  private CASE_API_PATH = `${environment.MIDDLEWARE_URL}/case`;
  private JOB_API_PATH = `${environment.MIDDLEWARE_URL}/job`;

  constructor(private http: HttpClient) {}

  public getAllCaseSummaries(): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant (?)
  }

  public searchCaseSummaries(queryTitle: string): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant (?)
  }

  public getCase(id: string): Observable<Case> {
    return this.http
      .get<Case>(`${this.CASE_API_PATH}/${id}`)
      .pipe(map(caseObject => caseObject));
  }

  public getJob(id: string): Observable<Job> {
    return this.http
      .get<Job>(`${this.JOB_API_PATH}/${id}`)
      .pipe(map(jobObject => jobObject));
  }

  public createJob(caseSelection: CaseSelection): Observable<object> {
    let body = JSON.stringify(caseSelection);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<object>(`${this.JOB_API_PATH}`, body, httpOptions)
      .pipe(catchError(this.handleError('createJob')));
  }

  public patchJob(id: string, patch: JobPatch) {
    let body = JSON.stringify(patch);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .patch<object>(`${this.JOB_API_PATH}/${id}`, body, httpOptions)
      .pipe(this.handleError('patchJob'));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(operation: string) {
    return (err: any) => {
      let errMsg = `error in ${operation}: ${err.error.message}`;
      console.log('DEBUG(middleware.service)', err);
      return throwError(errMsg);
      // return Observable.throw(errMsg);
    };
  }
}
