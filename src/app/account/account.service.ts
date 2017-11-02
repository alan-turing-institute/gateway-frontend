import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AccountInfo } from '../types/accountInfo';
import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';

@Injectable()
export class AccountService {
  // private BASE_COUNTER_URL: string = 'https://science-gateway-counter.azurewebsites.net/api';
  // private COUNTER_URL: string = 'http://localhost:5000/api/count';
  private COUNTER_URL: string = 'https://science-gateway-count.azurewebsites.net/api/count';

  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  constructor (private http: Http) {}

  getAccountData(): Observable<AccountInfo[]>{
    return this.http.get(this.COUNTER_URL)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // checkCounter(token): void {
  //   // let account = new AccountInfo (10, 40, 90, 110)
  //   // return account
  //   console.log('in service')
  //
  //
  // }

  checkCounter(token): Promise<any> {
    let url: string = `${this.COUNTER_URL}`;
    let headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    // return this.http.get(url, {}, {headers: headers}).toPromise();
    return this.http.get(url, {headers: headers}).toPromise();
  }

  private extractData(res: Response){
    let body = res.json();
    return body || { };
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
