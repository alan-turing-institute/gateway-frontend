import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {JobInfo} from '../dashboard/jobInfo';
import {JobConfig} from './jobConfigComponent';

@Injectable()
export class OutputService {
  private infosUrl = require('../../assets/job_status.json');
  private configsUrl = require('../../assets/job_config.json');
  constructor (private http: Http) {}

  info = this.getJobInfo()
  config = this.getJobConfig()
  data = this.getOutputData()

  getJobInfo(): Observable<JobInfo[]>{
      return this.http.get(this.infosUrl)
                      .map(this.extractJobs)
                      .catch(this.handleError)
  }

  getOutputData(): Observable<Array<any>>{
    return this.http.get(this.configsUrl)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  private extractJobs(res: Response){
    let body = res.json();
    return body.jobs || { };
  }

  private extractData(res: Response){
    let body = res.json();
    return body.data || { };
  }

  getJobConfig(): Observable<JobConfig[]>{
    return this.http.get(this.configsUrl)
                    .map(this.extractParameters)
                    .catch(this.handleError)
  }

  private extractParameters(res: Response){
    let body = res.json();
    return body.parameters|| { };
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
