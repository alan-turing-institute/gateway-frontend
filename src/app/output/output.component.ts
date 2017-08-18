import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseComponents } from '../config/caseComponents';

import { JobInfo } from '../dashboard/jobInfo';

import { OutputService } from './output.service';
import { ConfigDataService} from '../config/configData.service'

import { ChartsComponent } from './chart';


@Component({
  selector: 'output',
  providers: [OutputService],
  templateUrl: './output.component.html',
  styles: [require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./output.component.css').toString(),
  require('../config/config.component.css').toString(),
  require('../dashboard/jobSummary.css').toString()]
})

export class OutputComponent implements OnInit {
  case:CaseComponents
  jobInfo: JobInfo [];
  job_id: string;
  graph:{} = {collapse:false}
  config:{} = {collapse:false}
  errorMessage: string;
  caseID:string = "yy69843b-4939-6f37-96c7-c382c3e74b46";
  type:string = 'Output';
  status: string;

  constructor(private activatedRoute: ActivatedRoute,
  private outputService:OutputService,
  private configDataService:ConfigDataService) {}

  ngOnInit() {
        this.job_id = this.activatedRoute.snapshot.params["id"];
        console.log(!this.graph['collapse'])
        //get job status (same as in dashboard)
        this.getInfoData();
        this.case = new CaseComponents
        this.getTemplateData()
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
                      this.status = this.jobInfo[0].status
                    },
                    error => {
                      this.errorMessage = <any> error
                    });
 }

 graphCollapse(graph) {
     this.graph['collapse'] = !this.graph['collapse']
   }

 configCollapse(graph) {
     this.config['collapse'] = !this.config['collapse']
   }

   getTemplateData () {
     console.log(localStorage.getItem('template_id'));
     this.configDataService.template
                         .subscribe(
                           template => {
                             this.case=template['case']
                             console.log(this.case)
                           },
                           error => {
                             this.errorMessage = <any> error
                           });

                         }
  }
