import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { JOBS } from './mock-jobs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/map';

import { JobInfo } from '../types/jobInfo';
import { ProgressInfo } from '../types/progressInfo';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';

@Injectable()
export class DashboardService {
  
  private jobsUrl = urljoin(environment.apiRoot, "job")
  private progressUrl = urljoin(environment.apiRoot, "progress")
  private cancelUrl = urljoin(environment.apiRoot, "cancel")


  constructor (private http: HttpClient) {}

  // data = this.getJobsData()
  // mockdata = this.getMockData()

  getJobsData(): Observable<JobInfo[]>{
    // console.log("getting jobs")
    return this.http.get(this.jobsUrl)
                    // .map(this.extractData)
                    .catch(this.handleError);
  }

  getProgressInfo(jobId): Observable<ProgressInfo>{
    var url = urljoin(this.progressUrl, jobId)
    return this.http.get(url)
                    // .map(this.extractProgressJsonData)
                    .catch(this.handleError);
  }

  deleteJob(jobId): Observable<any> {
    var url = urljoin(this.jobsUrl, jobId);
    return this.http.delete(url)
                    // .map(this.extractJsonData)
                    .catch(this.handleError);
  }

  cancelJob(jobId): Observable<any> {
    var url = urljoin(this.cancelUrl, jobId);
    return this.http.post(url, null, null)
                    // .map(this.extractJsonData)
                    .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res;
    return body || { };
  }

private extractJsonData(res: Response){
    let body = res;
    return body || { };
  }

  private extractProgressJsonData(res: Response) {
    let body = res;
    return {};
    // return body.stdout.progress|| { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    // console.log(error)
    let errMsg: string;
    if (error instanceof Response) {
      // const body = error.json() || '';
      // const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${error}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getMockData(): Observable<any[]>{
    return of(JOBS)
  }
}
