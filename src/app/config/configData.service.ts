import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RequestOptions } from '@angular/http';
import {Headers} from '@angular/http';
// import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {InputComponent} from './inputComponent';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigDataService {
  
  private jobData;
  private templateUrl = environment.apiUrl+"cases/";
  private jobsUrl = environment.apiUrl+"jobs";
  private runUrl = environment.apiUrl+"run/";

  private response = {}
  constructor (private http: Http) {}

  getTemplate(template_id): Observable<InputComponent[]> {
    var url = this.templateUrl + template_id
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);

    return this.jobData;
  }

  getJob(url): Observable<InputComponent[]> {
    console.log(url);
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);

    return this.jobData;
  }


  getJobUrl(job_id): string {
    var url = this.jobsUrl + "/"+job_id
    console.log(url)
    return url
  }

  getCreateJobURL(job_id): string {
    return this.jobsUrl
  }

  getSaveJobURL(job_id): string {
    return this.jobsUrl +"/"+ job_id
  }

  createJob(jobData:any, newJobUrl): Observable<InputComponent[]> {
    console.log(jobData)
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
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let response = this.http.post(this.runUrl, jobData, options)
                    .catch(this.handleError);
    return response  
  
  }


  private arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

  updateJobData(supersetComponents, componentKey, newValue) : void {
    var index = this.arrayObjectIndexOf(supersetComponents, componentKey, 'name'); // 1
    supersetComponents[index].value = newValue;
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
