import { Injectable } from '@angular/core';
import { Response, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { CounterData } from '../types/counterData';

import { environment } from '../../environments/environment';
import * as urljoin from 'url-join';

@Injectable()
export class AccountService {
  // private COUNTER_URL: string = 'http://localhost:5000/api/count';
  private COUNTER_URL: string = 'https://science-gateway-count.azurewebsites.net/api/count';

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor (private http: HttpClient) {}

  getCounterData(token): Observable<object>{
    let url: string = `${this.COUNTER_URL}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.get(url, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  checkCounter(token): Promise<any> {
    let url: string = `${this.COUNTER_URL}`;
    let headers = new HttpHeaders({
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
