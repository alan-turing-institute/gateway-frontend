import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, tap, catchError } from 'rxjs/operators';
import * as FileSaver from 'file-saver';

import { Case, CaseSummary, CaseSelection } from '@simulations/models/case';
import { Job, JobSummary, JobPatch } from '@simulations/models/job';
import { Output } from '@simulations/models/output';
import { environment } from '@env/environment';

@Injectable()
export class MiddlewareService {
  private CASE_API_PATH = `${environment.MIDDLEWARE_URL}/case`;
  private JOB_API_PATH = `${environment.MIDDLEWARE_URL}/job`;

  constructor(private http: HttpClient) {}

  // summary content
  public getCaseSummaries(): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant (?)
  }

  public getJobSummaries(): Observable<JobSummary[]> {
    let httpOptions = {
      params: new HttpParams().set('per_page', '100'), // TODO server-side pagination
    };

    return this.http
      .get<JobSummary[]>(this.JOB_API_PATH, httpOptions)
      .pipe(map(jobSummaries => jobSummaries || [])); // TODO redundant (?)
  }

  public searchJobSummaries(name: string): Observable<JobSummary[]> {
    let queryParams = { name: name };

    return this.http
      .get<JobSummary[]>(`${this.JOB_API_PATH}/search`, {
        params: queryParams,
      })
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant (?)
  }

  // detail content

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

  // job actions content

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
      .pipe(catchError(this.handleError('patchJob')));
  }

  public startJob(id: string): Observable<object> {
    return this.http
      .post(`${this.JOB_API_PATH}/${id}`, null)
      .pipe(catchError(this.handleError('startJob')));
  }

  public stopJob(id: string): Observable<object> {
    return this.http
      .post(`${this.JOB_API_PATH}/${id}/stop`, null)
      .pipe(catchError(this.handleError('stopJob')));
  }

  public deleteJob(id: string): Observable<object> {
    return this.http
      .delete(`${this.JOB_API_PATH}/${id}`)
      .pipe(catchError(this.handleError('deleteJob')));
  }

  public getOutputs(id: string): Observable<Output[]> {
    return this.http
      .get<Output[]>(`${this.JOB_API_PATH}/${id}/output`)
      .pipe(catchError(this.handleError('getOutputs')));
  }

  public downloadOutput(output: Output) {
    this.http
      .get(output.destination, { responseType: 'blob' })
      .subscribe(blob => {
        FileSaver.saveAs(blob, output.filename);
      });
  }

  public getMetrics(url: string): Observable<object> {
    return this.http.get(url).pipe(catchError(this.handleError('getMetrics')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError(operation: string) {
    return (err: any) => {
      // let errMsg = `error in ${operation}: ${err.error.message}`;
      let errMsg = `error in ${operation}: ${err}`;
      console.log('DEBUG(middleware.service)', err);
      return throwError(errMsg);
    };
  }
}
