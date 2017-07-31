import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobInfo } from './jobInfoComponent';
import { JobConfig } from './jobConfigComponent';

import { OutputService } from './output.service';

import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  selector: 'output',
  providers: [OutputService],
  templateUrl: './output.component.html',
})

export class OutputComponent implements OnInit {

  //allJobsInfo: JobInfo [];
  //allJobsConfig: JobConfig [];
  jobInfo: JobInfo [];
  jobConfig: JobConfig;
  job_id: string;
  tags:{label: string, id: string, collapse: boolean} [];
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute,
  private outputService:OutputService) {}

  ngOnInit() {
        this.job_id = this.activatedRoute.snapshot.params["id"];
        this.tags = [];
        this.getInfoData();
        this.getConfigData();
      }

getInfoData(){
  this.outputService.info
                  .subscribe(
                    allJobsInfo => {
                      this.jobInfo = [allJobsInfo[this.job_id]]
                    },
                    error => {
                      this.errorMessage = <any> error
                    });
 }

getConfigData(){
  this.outputService.config
                    .subscribe(
                      allJobsConfig => {
                        this.jobConfig= allJobsConfig[this.job_id]
                        this.tags = this.getFamilyTags(this.jobConfig)
                      },
                      error => {
                        this.errorMessage = <any> error
                      });
}


getFamilyTags(components): {label: string, id: string, collapse: boolean} [] {
   var tags = []
   for (var key in components) {
       tags = tags.concat(components[key].tag)
   }

   var flags = {};
   var uniqueTags = tags.filter(function(tag) {
       if (flags[tag.id]) {
           return false;
       }
       flags[tag.id] = true;
       return true;
   });
   // console.log(uniqueTags)
   return uniqueTags
 }

 getComponentsOfFamily(jobConfiguration, tag) {
     let components = []
     //loop through job configuration information
     for (var key in jobConfiguration){
          //for each config component, check if label is present
           if (jobConfiguration[key].tag[0].label.indexOf(tag) > -1){
               components.push(jobConfiguration[key])
           }
         }

     return components
 }

getDataTarget(tag) {
   return "#" + tag.id
 }

getVisibleComponents(tag) {
 return this.getComponentsOfFamily(this.jobConfig, tag.label);
 }

 toggleCollapse(tag) {
   let element = document.getElementById(tag.id)
   let tagToToggle = this.tags.filter(function(x) { if (x.id === tag.id) return x });
   for (var _i = 0; _i < tagToToggle.length; _i++) {
     tagToToggle[_i].collapse = !tagToToggle[_i].collapse
   }

 }

}
