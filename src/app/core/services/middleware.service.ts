import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case, CaseSummary, CaseSelection } from '@simulations/models/case';
import { Job } from '@simulations/models/job';
import { environment } from '@env/environment';

@Injectable()
export class MiddlewareService {
  private CASE_API_PATH = `${environment.MIDDLEWARE_URL}/case`;
  private JOB_API_PATH = `${environment.MIDDLEWARE_URL}/job`;

  constructor(private http: HttpClient) {}

  getAllCaseSummaries(): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant (?)
  }

  searchCaseSummaries(queryTitle: string): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant (?)
  }

  getCase(id: string): Observable<Case> {
    return this.http
      .get<Case>(`${this.CASE_API_PATH}/${id}`)
      .pipe(map(caseObject => caseObject));
  }

  getJob(id: string): Observable<Job> {
    return this.http
      .get<Job>(`${this.JOB_API_PATH}/${id}`)
      .pipe(map(jobObject => jobObject));
  }

  createJob(caseSelection: CaseSelection): Observable<object> {
    let body = JSON.stringify(caseSelection);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<object>(`${this.JOB_API_PATH}`, body, httpOptions);
  }
}
