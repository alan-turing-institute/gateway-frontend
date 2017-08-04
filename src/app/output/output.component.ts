import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobInfo } from '../dashboard/jobInfoComponent';
import { JobConfig } from './jobConfigComponent';
import { JobData } from './jobDataComponent';

import { OutputService } from './output.service';

import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from "d3-shape";
import * as d3Array from 'd3-array';
import *  as d3Axis from 'd3-axis';

@Component({
  selector: 'output',
  providers: [OutputService],
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent implements OnInit {

  jobInfo: JobInfo [];
  jobConfig: JobConfig [];
  jobData: JobData [];
  job_id: string;
  tags:{label: string, id: string, collapse: boolean} [];
  errorMessage: string;

  //graph variables
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 50};

  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(private activatedRoute: ActivatedRoute,
  private outputService:OutputService) {}

  ngOnInit() {
        this.job_id = this.activatedRoute.snapshot.params["id"];
        this.tags = [];

        this.width = 500 - this.margin.left - this.margin.right ;
        this.height = 500 - this.margin.top - this.margin.bottom;

        //get job status (same as in dashboard) + original configuration information
        this.getInfoData();
        this.getConfigData();

        //get data and draw graph
        this.getJobData();
      }

//Get all the data
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
                        this.jobConfig= allJobsConfig
                        this.tags = this.getFamilyTags(this.jobConfig)
                      },
                      error => {
                        this.errorMessage = <any> error
                      });
}

getJobData(){
  this.outputService.data
                    .subscribe(
                      allData => {
                        this.jobData = allData
                        //now that have data, call functions to draw graph
                        this.initSvg();
                        this.initAxis();
                        this.drawAxis();
                        this.drawLine();
                      },
                      error => {
                        this.errorMessage = <any> error
                      }
                    )
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


 //d3 graph draw
 private initSvg() {
   this.svg = d3.select("svg")
                .append("g")
                .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
}

private initAxis() {
   this.x = d3Scale.scaleTime().range([0, this.width]);
   this.y = d3Scale.scaleLinear().range([this.height, 0]);
   //in current example x values are dates -- can take out if that is not what will be plotted
   this.x.domain(d3Array.extent(this.jobData, (d) => new Date(d.date)));
   this.y.domain(d3Array.extent(this.jobData, (d) => d.value ));
 }

 private drawAxis() {

   this.svg.append("g")
         .attr("class", "axis axis--x")
         .attr("transform", "translate(0," + this.height + ")")
         .call(d3Axis.axisBottom(this.x));

   this.svg.append("g")
         .attr("class", "axis axis--y")
         .call(d3Axis.axisLeft(this.y))
         .append("text")
         .attr("class", "axis-title")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("Price ($)");
 }

 private drawLine() {
   this.line = d3Shape.line()
                      //in current example x-values are dates
                      //can remove if no longer applicable
                      .x( (d: any) => this.x(new Date(d.date)) )
                      .y( (d: any) => this.y(d.value) );

   this.svg.append("path")
           .datum(this.jobData)
           //.attr("class", "line")
           .attr("fill", "none")
           .attr('stroke', "black")
           .attr("d", this.line);
 }

}
