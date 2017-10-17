import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { JobTemplate } from './jobTemplate';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';

@Injectable()
export class OutputService {
  //url for getting job information
  private jobUrl = urljoin(environment.apiRoot, "jobs")

  //url for getting job data used to plot the graph
  private dataUrl = urljoin(environment.apiRoot, 'data')


  constructor (private http: Http) {}

  // info = this.getJobInfo()
  // data = this.getOutputData()

  getJob(): Observable<JobTemplate>{
      var url = urljoin(this.jobUrl, localStorage.getItem('job_id'))
      return this.http.get(url)
                      .map(this.extractJobs)
                      .catch(this.handleError)
  }

  getOutput(): Observable<Array<any>>{
    var url = urljoin(this.dataUrl, localStorage.getItem('job_id'))
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError)
  }


  private extractJobs(res: Response){
    let body = res.json();
    return body || { };
  }

  // private extractData(res: Response){
  //   let body = res.json();
  //   return body.data || { };
  // }

  private extractData(res: Response){
    let body = res.json();
    let gatewayData = body.stdout;
    // console.log(body);
    // console.log(gatewayData.data);
    return gatewayData.data || { };
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


  downloadFile(fileUrl): Observable<Blob> {
      let headers = new Headers({'Content-Type':'text/csv'});
      let options = new RequestOptions({headers:headers, responseType: ResponseContentType.Blob });
      return this.http.get(fileUrl, options)
          .map(res => res.blob())
          .catch(this.handleError)
  }

}
