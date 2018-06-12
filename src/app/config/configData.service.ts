import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';
// import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JobInfo } from '../types/jobInfo';
import { JobAbout } from '../types/jobAbout';
import { JobValues } from '../types/jobValues';
import {InputComponent} from '../components/input/inputComponent';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';

@Injectable()
export class ConfigDataService {

  private jobData;
  private templateUrl = urljoin(environment.apiRoot, "");
  private jobsUrl = urljoin(environment.apiRoot, "job");
  private response = {}
  constructor (private http: Http) {}

  getTemplate(template_id): Observable<JobInfo> {
    var url = urljoin(this.templateUrl, template_id)
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);

    return this.jobData;
  }

  getJob(job_id): Observable<JobInfo> {
    var url = urljoin(this.jobsUrl, job_id)
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    console.log(this.jobData)
    return this.jobData;
  }

  getJobUrl(job_id): string {
    var url = urljoin(this.jobsUrl, job_id)
    return url
  }

  getCreateJobURL(jobAbout): string {
    return this.jobsUrl
    // return
  }

  getSaveJobURL(job_id): string {
    // console.log(urljoin(this.jobsUrl, job_id))
    return urljoin(this.jobsUrl, job_id)
  }

  createJob(jobAbout:JobAbout, newJobUrl):Observable<any> {
    let body = JSON.stringify(jobAbout)
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.post(newJobUrl, body, options)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    return response
  }

  patchJob(jobAbout:JobAbout, newJobUrl): Observable<InputComponent[]> {
    // console.log(jobData)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.jobData = this.http.post(newJobUrl, jobAbout, options)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    return  this.jobData
  }

  saveJob(jobValues:JobValues, newJobUrl): Observable<InputComponent[]> {
    console.log("in save")
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.patch(newJobUrl, jobValues, options)
                    .catch(this.handleError);
    return response
  }

  runJob(jobData:any): Observable<any> {
    let url = urljoin(this.jobsUrl, jobData['id']);
    console.log("Running job at: " +url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.post(url, options)
                    .catch(this.handleError);
    return response
  }

  private extractJsonData(res: Response) {
    let body = res.json();
    // this.response = body
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
