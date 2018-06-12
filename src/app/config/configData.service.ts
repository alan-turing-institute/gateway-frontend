import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

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
  constructor (private http: HttpClient) {}

  getTemplate(template_id): Observable<JobInfo> {
    var url = urljoin(this.templateUrl, template_id)
    this.jobData = this.http.get(url)
                    .catch(this.handleError);

    return this.jobData;
  }

  getJob(job_id): Observable<JobInfo> {
    var url = urljoin(this.jobsUrl, job_id)
    this.jobData = this.http.get(url)
                    .catch(this.handleError);
    return this.jobData;
  }

  getJobUrl(job_id): string {
    var url = urljoin(this.jobsUrl, job_id)
    return url
  }

  getCreateJobURL(jobAbout): string {
    return this.jobsUrl
  }

  getSaveJobURL(job_id): string {
    return urljoin(this.jobsUrl, job_id)
  }

  createJob(jobAbout:JobAbout, newJobUrl):Observable<any> {
    let body = JSON.stringify(jobAbout)
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let response = this.http.post(newJobUrl, body, {headers: headers})
                    // .map(this.extractJsonData)
                    .catch(this.handleError);
    return response
  }

  saveJob(jobValues:JobValues, newJobUrl): Observable<InputComponent[]> {
    console.log("in save")
    let response = this.http.patch(newJobUrl, jobValues)
                    .catch(this.handleError);
    return response
  }

  runJob(jobData:any): Observable<any> {
    let url = urljoin(this.jobsUrl, jobData['id']);
    console.log("Running job at: " +url);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    let response = this.http.post(url, { headers: headers })//, options)
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
