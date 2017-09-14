import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JobInfo } from './jobInfo';
import { ProgressInfo } from './progressInfo';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';

@Injectable()
export class DashboardService {
  // private jobsUrl = require('../../assets/job_status.json');
  // private jobsUrl = 'http://localhost:5000/api/jobs';
  // apiRoot: 'http://dev-science-gateway-middleware.azurewebsites.net/api/',
  // private progressUrl = require('../../assets/progress.json')
  //private progressUrl = 'http://localhost:5000/api/progress/';
  private jobsUrl = urljoin(environment.apiRoot, "jobs")
  private progressUrl = urljoin(environment.apiRoot, "progress")
  private cancelUrl = urljoin(environment.apiRoot, "cancel")


  constructor (private http: Http) {}

  data = this.getJobsData()

  getJobsData(): Observable<JobInfo[]>{
    return this.http.get(this.jobsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getProgressInfo(jobId): Observable<ProgressInfo>{
    var url = urljoin(this.progressUrl, jobId)
    return this.http.get(url)
                    .map(this.extractProgressJsonData)
                    .catch(this.handleError);
  }

  deleteJob(jobId): Observable<any> {
    var url = urljoin(this.jobsUrl, jobId);
    return this.http.delete(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
  }

  cancelJob(jobId): Observable<any> {
    var url = urljoin(this.cancelUrl, jobId);
    return this.http.post(url, null, null)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body.jobs || { };
  }

private extractJsonData(res: Response){
    let body = res.json();
    return body || { };
  }

  private extractProgressJsonData(res: Response) {
    let body = res.json();
    return body.stdout.progress|| { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    // console.log(error)
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
