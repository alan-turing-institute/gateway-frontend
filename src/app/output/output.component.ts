import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobInfo } from '../types/jobInfo'
import { OutputService } from './output.service';

import { ChartComponent } from './chart/chart.component';

import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Component({
  providers: [OutputService],
  templateUrl: './output.component.html',
  styles: [require('./output.component.css').toString()]
})

export class OutputComponent implements OnInit {
  job: JobInfo;
  job_id: string;
  chart:{} = {collapse:false}
  config:{} = {collapse:false}
  errorMessage: string;
  type: string = 'Output';
  status: string = 'Error';
  haveData: boolean;
  relativeCreationTime: string;
  relativeStartTime: string;
  relativeEndTime: string;

  constructor(
      private activatedRoute: ActivatedRoute,
      private outputService: OutputService
    ) {}

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.outputService.getJob()
                    .subscribe(
                      allJobsInfo => {
                        this.job = allJobsInfo
                        this.status = this.job.status
                        this.temporalDistanceFromCreation()
                        this.haveData = true
                      },
                      error => {
                        this.errorMessage = <any> error
                      });
  }

  temporalDistanceFromCreation() {
    this.relativeCreationTime = moment(this.job.creation_datetime).fromNow()
    this.relativeStartTime = moment(this.job.start_datetime).fromNow()
    this.relativeEndTime = moment(this.job.end_datetime).fromNow()
  }

  chartCollapse() {
     this.chart['collapse'] = !this.chart['collapse']
   }

  configCollapse() {
     this.config['collapse'] = !this.config['collapse']
   }

  downloadFile(fileUrl) {
    console.log('downloading csv data')
      this.outputService.downloadFile(fileUrl).subscribe(blob=>{
       FileSaver.saveAs(blob, 'output.csv')
    })
  }

}
