import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobInfo } from '../dashboard/jobInfo';

import { OutputService } from './output.service';

import { ChartsComponent } from './chart';



@Component({
  selector: 'output',
  providers: [OutputService],
  templateUrl: './output.component.html',
  styles: [require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./output.component.css').toString(),
  require('../config/config.component.css').toString()]
})

export class OutputComponent implements OnInit {

  jobInfo: JobInfo [];
  job_id: string;
  sections:{label: string, id: string, collapse: boolean} [] = [{label:'graph', id:'graph', collapse:false},
                                                                {label:'config', id:'config', collapse:false}];
  errorMessage: string;


  constructor(private activatedRoute: ActivatedRoute,
  private outputService:OutputService) {}

  ngOnInit() {
        this.job_id = this.activatedRoute.snapshot.params["id"];

        //get job status (same as in dashboard)
        this.getInfoData();
      }


//Get all the data
getInfoData(){
  this.outputService.info
                  .subscribe(
                    allJobsInfo => {
                      //get all jobs
                      //find which job want to plot
                      for(let job of allJobsInfo){
                        if(job.id == this.job_id){
                          this.jobInfo = [job]
                        }
                      }
                    },
                    error => {
                      this.errorMessage = <any> error
                    });
 }

 toggleCollapse(section) {
   //let element = document.getElementById(section.name)
   let tagToToggle = this.sections.filter(function(x) { if (x.id === section.id) return x });
   for (var _i = 0; _i < tagToToggle.length; _i++) {
     tagToToggle[_i].collapse = !tagToToggle[_i].collapse
   }
 }

}
