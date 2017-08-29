import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {JobInfo} from '../dashboard/jobInfo';
import {JobConfig} from './jobConfigComponent';
import { CaseInfo } from '../cases/case/caseInfo';


@Injectable()
export class OutputService {
  //url for getting job configuration information
  private infosUrl = require('../../assets/job_status.json');

  //url for getting job data used to plot the graph
  //should be similar to above BUT with a data query added
  private dataUrl = require('../../assets/sample_data.json');

  //url for getting generic information about the case type
  //private caseUrl = require('../../assets/case_types.json')
  private caseUrl = 'http://localhost:5000/api/cases';
  constructor (private http: Http) {}

  info = this.getJobInfo()
  //config = this.getJobConfig()
  data = this.getOutputData()

  case = this.getCaseInfo()

  getJobInfo(): Observable<JobInfo[]>{
      return this.http.get(this.infosUrl)
                      .map(this.extractJobs)
                      .catch(this.handleError)
  }

  getOutputData(): Observable<Array<any>>{
    return this.http.get(this.dataUrl)
                    .map(this.extractData)
                    .catch(this.handleError)
  }

  getCaseInfo():Observable<CaseInfo[]>{
    return this.http.get(this.caseUrl)
                    .map(this.extractCases)
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

  private extractCases(res: Response){
    let body = res.json();
    return body.cases || { };
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
