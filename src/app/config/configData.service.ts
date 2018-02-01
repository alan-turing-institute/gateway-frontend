import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';
// import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JobInfo } from '../types/jobInfo';
import {InputComponent} from '../components/input/inputComponent';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';

@Injectable()
export class ConfigDataService {

  private jobData;
  private templateUrl = urljoin(environment.apiRoot, "case");
  private jobsUrl = urljoin(environment.apiRoot, "jobs");
  private runUrl = urljoin(environment.apiRoot, "run");
  private response = {}
  constructor (private http: Http) {}

  getTemplate(template_id): Observable<JobInfo> {
    var url = urljoin(this.templateUrl, template_id)
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);

    return this.jobData;
  }

  getJob(url): Observable<JobInfo> {
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);

    return this.jobData;
  }


  getJobUrl(job_id): string {
    var url = urljoin(this.jobsUrl, job_id)
    return url
  }

  getCreateJobURL(job_id): string {
    return this.jobsUrl
  }

  getSaveJobURL(job_id): string {
    return urljoin(this.jobsUrl, job_id)
  }

  createJob(jobData:any, newJobUrl): Observable<InputComponent[]> {
    // console.log(jobData)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.jobData = this.http.post(newJobUrl, jobData, options)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    return  this.jobData
  }

  saveJob(jobData:any, newJobUrl): Observable<InputComponent[]> {
    console.log("in save")
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.patch(newJobUrl, jobData, options)
                    .catch(this.handleError);
    return response
  }

  runJob(jobData:any): Observable<any> {
    console.log("in run")
    let url = urljoin(this.runUrl, jobData['id']);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.post(url, jobData, options)
                    .catch(this.handleError);
    return response
  }

  private extractJsonData(res: Response) {
    console.log(res)
    let body = res.json();
    this.response = body

    return body || { };
  }

  private extractDescription():string {
    return this.response['case'].description;
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
