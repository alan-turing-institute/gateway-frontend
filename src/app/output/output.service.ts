import { Injectable } from '@angular/core';
import { Response, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JobInfo } from '../types/jobInfo';
import { environment } from '../../environments/environment';

import * as urljoin from 'url-join';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';

@Injectable()
export class OutputService {
  //url for getting job information
  private jobUrl = urljoin(environment.apiRoot, "job")

  //url for getting job data used to plot the graph
  // private dataUrl = urljoin(environment.apiRoot, 'data')


  constructor (private http: HttpClient) {}

  // info = this.getJobInfo()
  // data = this.getOutputData()

  getJob(): Observable<JobInfo>{
      var url = urljoin(this.jobUrl, localStorage.getItem('job_id'))
      return this.http.get(url)
                      // .map(this.extractJobs)
                      .catch(this.handleError)
  }

  // getOutput(): Observable<Array<any>>{
  //   var url = urljoin(this.dataUrl, localStorage.getItem('job_id'))
  //   return this.http.get(url)
  //                   .map(this.extractData)
  //                   .catch(this.handleError)
  // }
  //  private extractData(res: Response){
  //   let body = res.json();
  //   let gatewayData = body.stdout;
  //   // console.log(body);
  //   // console.log(gatewayData.data);
  //   return gatewayData.data || { };
  // }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    // console.log(error)
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText || ''} ${error}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  downloadFile(fileUrl): Observable<Blob> {
      return this.http.get(fileUrl, {responseType: "blob" })
          .catch(this.handleError)
  }

}
