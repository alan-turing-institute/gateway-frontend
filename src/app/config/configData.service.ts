import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {InputComponent} from './inputComponent';


@Injectable()
export class ConfigDataService {
  private getTemplateUrl = require('../../assets/job_template.json');
  // private getTemplateUrl = require('http://localhost:5000/api/cases/');
  private templateData;

  private getNewJobUrl = require('../../assets/job_template.json');
  // private getNewJobUrl = require('http://localhost:5000/api/jobs/');
  private jobData;

  private saveJobUrl = require('../../assets/job_template.json');
  // private getNewJobUrl = require('http://localhost:5000/api/jobs/');

  private response = {}
  constructor (private http: Http) {}

  template = this.getTemplateData()
  newJob = this.getNewJobData()
  saveJob = this.saveJobData()
  
  getTemplateData(): Observable<InputComponent[]> {
    let url = this.getTemplateUrl;
    // let url = this.getTemplateUrl + localStorage.getItem('template_id') 
    this.templateData = this.http.get(this.getTemplateUrl)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    return this.templateData;
  }

  getNewJobData(): Observable<InputComponent[]> {
    let url = this.getNewJobUrl;
    this.jobData = this.http.post(url, this.templateData)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    return this.jobData
  }

  saveJobData(): Observable<InputComponent[]> {
    let url = this.saveJobUrl;
    let response = this.http.patch(url, this.jobData)
                    .map(this.extractJsonData)
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
    let body = res.json();
    this.response = body
    // console.log("making a call")
    // console.log(body.parameters)
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
