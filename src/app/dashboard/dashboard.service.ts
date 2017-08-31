import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {JobInfo} from './jobInfo';
import {ProgressInfo} from './progressInfo';

@Injectable()
export class DashboardService {
  // private jobsUrl = require('../../assets/job_status.json');
  private jobsUrl = 'http://localhost:5000/api/jobs';
  private progressUrl = require('../../assets/progress.json')
  //private progressUrl = 'http://localhost:5000/api/progress/';
  constructor (private http: Http) {}

  data = this.getJobsData()

  getJobsData(): Observable<JobInfo[]>{
    return this.http.get(this.jobsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getProgressInfo(jobId): Observable<ProgressInfo>{
    var url = this.progressUrl + jobId
    return this.http.get(this.progressUrl)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
  }

  deleteJob(jobId): Observable<any>{
    var url = this.jobsUrl + "/"+jobId
    return this.http.delete(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
  }


  private extractData(res: Response){
    let body = res.json();
    return body.jobs || { };
  }

  private extractJsonData(res: Response) {
    let body = res.json();
    return body|| { };
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
