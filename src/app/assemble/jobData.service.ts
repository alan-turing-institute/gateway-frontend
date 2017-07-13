import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class JobDataService {
  private componentsUrl = 'assets/job.json';
  constructor (private http: Http) {}

  data = this.getJobData()
  
  getJobData(): Observable<InputComponent[]> {
    // console.log("reading")
    return this.http.get(this.componentsUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log("making a call")
    console.log(body.data)
    return body.data || { };
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
