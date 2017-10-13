import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobTemplate } from './jobTemplate';

import { OutputService } from './output.service';

import { ChartsComponent } from './chart';

import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Component({
  // selector: 'output',
  providers: [OutputService],
  templateUrl: './output.component.html',
  styles: [require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./output.component.css').toString(),
  require('../config/config.component.css').toString(),
  require('../dashboard/jobSummary.css').toString()]
})

export class OutputComponent implements OnInit {

  job: JobTemplate;
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
        //this.job_id = localStorage.getItem('job_id')
        //this.job_id = "d769843b-6f37-4939-96c7-c382c3e74b46"
        this.getInfoData();
      }


  //Get all the data
  getInfoData(){
    this.outputService.info
                    .subscribe(
                      allJobsInfo => {
                        this.job = allJobsInfo
                        this.status = this.job.status
                        this.relativeTimes()
                        console.log("status: " + this.job.status)
                        // this.status = "Running"
                        this.haveData = true
                      },
                      error => {
                        this.errorMessage = <any> error
                      });
  }

  relativeTimes() {
    this.relativeCreationTime = moment(this.job.creation_datetime).fromNow()
    this.relativeStartTime = moment(this.job.start_datetime).fromNow()
    this.relativeEndTime = moment(this.job.end_datetime).fromNow()
    console.log('this.job.creation_datetime', this.job.creation_datetime)
    console.log('this.relativeCreationTime', this.relativeCreationTime)
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