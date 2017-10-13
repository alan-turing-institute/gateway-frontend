import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

import { CaseInfo } from '../components/description/caseInfo';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';

@Injectable()
export class CasesService {

  constructor (private http: Http) {}

  getCases(): Observable<CaseInfo[]>{
    let templateUrl = urljoin(environment.apiRoot, "cases");
    return this.http.get(templateUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body.cases || { };
  }

  private handleError (error: Response | any) {
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
