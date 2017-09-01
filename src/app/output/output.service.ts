import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {JobTemplate} from './jobTemplate';
import { environment } from '../../environments/environment';


@Injectable()
export class OutputService {
  //url for getting job information
  // private jobUrl = require('../../assets/job_template.json');
  // private jobUrl = 'http://localhost:5000/api/jobs'
  private jobUrl = environment.apiUrl + "jobs"

  //url for getting job data used to plot the graph
  // private dataUrl = require('../../assets/sample_data.json');
  // private dataUrl = 'http://localhost:5000/api/data'
  private dataUrl = environment.apiUrl+'data'

  private csvUrl = '../../../example.csv'


  constructor (private http: Http) {}

  info = this.getJobInfo()
  data = this.getOutputData()

  getJobInfo(): Observable<JobTemplate>{
      var url = this.jobUrl + "/" + localStorage.getItem('job_id')
      return this.http.get(url)
                      .map(this.extractJobs)
                      .catch(this.handleError)
  }

  getOutputData(): Observable<Array<any>>{
    var url = this.dataUrl + "/" + localStorage.getItem('job_id')
    return this.http.get(url)
                    .map(this.extractData)
                    .catch(this.handleError)
  }


  private extractJobs(res: Response){
    let body = res.json();
    return body || { };
  }

  private extractData(res: Response){
    let body = res.json();
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



  downloadFile(): Observable<Blob> {
      let headers = new Headers({'Content-Type':'text/csv'});
      let options = new RequestOptions({headers:headers, responseType: ResponseContentType.Blob });
      return this.http.get(this.csvUrl, options)
          .map(res => res.blob())
          .catch(this.handleError)
  }



}
