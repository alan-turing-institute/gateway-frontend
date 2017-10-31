import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AccountInfo } from '../types/accountInfo';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';

@Injectable()
export class AccountService {
  private progressUrl = urljoin(environment.apiRoot, "progress")
  constructor (private http: Http) {}

  getAccountData(): Observable<AccountInfo[]>{
    return this.http.get(this.progressUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getAccountDataFile(): AccountInfo {
    let account = new AccountInfo ("May Yong", "5", "10", "8000")
    return account 
  }

  private extractData(res: Response){
    let body = res.json();
    return body.jobs || { };
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
