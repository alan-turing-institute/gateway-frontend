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
  styleUrls:['./output.component.css'],
  // styles: [require('./output.component.css').toString()]
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
  flatParametersList: Array<any>;

  constructor(
      private activatedRoute: ActivatedRoute,
      private outputService: OutputService
    ) {}

  ngOnInit() {
    this.flatParametersList=[]
    this.getData();
  }

  flattenFamiliesStructure() {
    this.job.families.forEach(family => {
      family.parameters.forEach(parameter => {
        let parameterList = {"family":family.label, 
          "name":parameter.label, 
          "unit":parameter.units,
          "value":parameter.value,
          "default":parameter.value,
        }  
        this.flatParametersList.push(parameterList);
      })
    })
    console.log(this.flatParametersList)
  }

  getData(){
    this.outputService.getJob()
                    .subscribe(
                      allJobsInfo => {
                        this.job = allJobsInfo
                        this.status = this.job.status
                        this.temporalDistanceFromCreation()
                        this.haveData = true
                        // this.flattenFamiliesStructure()
                        this.job.outputs = [
                          {
                              "type": "zip",
                              "destination_path": "https://sgmiddleware.blob.core.windows.net/dambreakoutput/12/output.zip"
                          },
                          {
                            "type": "csv",
                            "destination_path": "https://sgmiddleware.blob.core.windows.net/blue/prerun_stratified_flow/output.csv"
                        },
                        ]
                        console.log(this.job);
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

  // chartCollapse() {
  //    this.chart['collapse'] = !this.chart['collapse']
  //  }

  // configCollapse() {
  //    this.config['collapse'] = !this.config['collapse']
  //  }

}
