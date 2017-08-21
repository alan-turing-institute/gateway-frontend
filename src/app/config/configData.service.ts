import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {InputComponent} from './inputComponent';


@Injectable()
export class ConfigDataService {
  private getTemplateUrl = require('../../assets/job_template.json');
  private templateUrl = 'http://localhost:5000/api/cases/';
  // private templateData;

  private getNewJobUrl = require('../../assets/job_template.json');
  private newJobUrl = 'http://localhost:5000/api/jobs/';
  private jobData;

  private saveJobUrl = require('../../assets/job_template.json');
  // private getNewJobUrl = require('http://localhost:5000/api/jobs/');

  private getOutputUrl = require('../../assets/job_output.json');
  private response = {}
  constructor (private http: Http) {}

  template = this.getTemplate()
  output = this.getOutputData()
  create = this.createJob()
  save = this.saveJob()

  getTemplate(): Observable<InputComponent[]> {
    console.log("in template")
    var url = this.templateUrl + localStorage.getItem('template_id') 
    this.jobData = this.http.get(url)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
    
    return this.jobData;
  }

  saveJobID(job_id): void {
    console.log("am I here");
    console.log(job_id)
    localStorage.setItem("job_id", job_id)
    console.log("Job ID: " + localStorage.getItem('job_id'))
    this.newJobUrl = this.newJobUrl + localStorage.getItem('job_id') 
    console.log(this.newJobUrl)
  }

  createJob(): Observable<InputComponent[]> {
    // let url = this.getNewJobUrl;
    // var url = this.newJobUrl;
    

    this.jobData = this.http.post(this.newJobUrl, this.jobData)
                    // .map(this.extractJsonData)
                    .catch(this.handleError);
    console.log("Response: "+this.jobData)

    return  this.jobData
  }

  saveJob(): Observable<InputComponent[]> {
    console.log("in save")
    let url = this.saveJobUrl;
    let response = this.http.patch(url, this.jobData)
                    .catch(this.handleError);
    return response
  }

  getOutputData(): Observable<InputComponent[]> {
    // console.log("reading")
    return this.http.get(this.getOutputUrl)
                    .map(this.extractJsonData)
                    .catch(this.handleError);
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
