import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class JobDataService {
  private getTemplateUrl = require('../../../assets/job_template.json');
  constructor (private http: Http) {}

  template = this.getTemplateData()
  
  getTemplateData(): Observable<InputComponent[]> {
    // console.log("reading")
    return this.http.get(this.getTemplateUrl)
                    .map(this.extractTemplateData)
                    .catch(this.handleError);
  }

  updateJobData(supersetComponents, componentKey, newValue) {
     supersetComponents[componentKey].value = newValue;
     return supersetComponents
  }

  private extractTemplateData(res: Response) {
    let body = res.json();
    // console.log("making a call")
    console.log(body.parameters)
    return body.parameters || { };
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
