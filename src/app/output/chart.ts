import { Component, Input, OnInit, NgZone, OnChanges, ViewChild, ElementRef, HostListener  } from '@angular/core';

import { OutputService } from './output.service';

//import {NgxChartsModule} from '@swimlane/ngx-charts';

//import { BaseChartDirective } from 'ng2-charts/ng2-charts';
//import * as d3 from 'd3-selection';
//import * as d3Scale from 'd3-scale';
//import * as d3Shape from "d3-shape";
//import * as d3Array from 'd3-array';
//import *  as d3Axis from 'd3-axis';

@Component({
  selector: 'chart',
  providers: [OutputService],
  template: `
  <div class='container-fluid'>
    <div class = "card">
      <div class="card-header">
        Output graph
      </div>
      <div class="card-block">

          <!-- <svg width = "500" height="500"></svg>-->
          <div class = "row">
          <div class = "col-md-12">
      <div *ngIf="isDataAvailable">
          <ngx-charts-line-chart
          [view]="view"
          [scheme]="colorScheme"
          [results]="graphData"
          [gradient]="gradient"
          [xAxis]="showXAxis"
          [yAxis]="showYAxis"
          [legend]="showLegend"
          [showXAxisLabel]="showXAxisLabel"
          [showYAxisLabel]="showYAxisLabel"
          [xAxisLabel]="xAxisLabel"
          [yAxisLabel]="yAxisLabel"
          [autoScale]="autoScale"
          >
        </ngx-charts-line-chart>
    </div>
    </div>
    </div>
          <!-- <button (click)="update()">UPDATE</button>

          <div class = "row">
          <div class = "col-md-12">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              X-AXIS
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <div *ngFor="let key of keys">
              <button class="dropdown-item" type="button" value={{key}} >{{key}}</button>
            </div>
            </div>
          </div>
          </div>
          </div>-->

          <select (change)='onChangeX($event.target.value)' >
            <option *ngFor="let key of keys" >{{key}}</option>
          </select>

          <select (change)='onChangeY($event.target.value)' >
            <option *ngFor="let y_var of y_vars" >{{y_var}}</option>
          </select>
      </div>
    </div>
  </div>`,
  inputs:['lineChartLabel', 'lineChartData']
})

export class ChartsComponent implements OnInit{

  //@ViewChild(BaseChartDirective) chart: BaseChartDirective;

  errorMessage: string;
  jobData: {};
  keys: Array<any>;
  y_vars: Array<any> = [];
  data: Array<any> = [];
  //dataset: Array<{data: Array<number[]> | number[], label: string}>
  isDataAvailable:boolean = true;
  //current: string;
  varX: string;
  varY: string;
  x_type: string;
  graphData: Array<any>


  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = '';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  autoScale = true;
  //for dropdown menu
  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};
  //items: Array<string> = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];
  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  constructor(private outputService:OutputService){}

  ngOnInit(){
    this.getJobData()
  }

  getJobData(){
    this.outputService.data
                      .subscribe(
                        allData => {
                          this.jobData = allData
                          this.keys = this.jobData["keys"]
                          //this.data = []
                          for (let key of this.keys){
                            this.data.push(this.jobData[key])
                            if (typeof(this.jobData[key][0]) === 'number'){
                              this.y_vars.push(key)
                            }
                            //console.log(this.y_vars)

                          }
                          //console.log(this.jobData)
                          //console.log(this.data)
                          //draw first 2 variables against each other
                          //this.chartData = [{data: this.jobData[this.keys[0]], label: this.keys[0]}]
                          //this.chartLabels=this.jobData[this.keys[1]]

                          //plot first 2 vars against each other
                          this.varY = this.y_vars[0]
                          if(this.keys[0] != this.y_vars[0]){
                            this.varX = this.keys[0]
                          }else{
                            this.varX = this.keys[1]
                            //reorder keys so that top choice in dropdown is name of X variable being plotted
                            let temp = this.keys[0]
                            this.keys[0] = this.keys[1]
                            this.keys[1] = temp
                          }


                          //this.x_type = typeof(this.jobData[this.varX][0])

                          //if(this.x_type === 'number'){
                          //  console.log(this.x_type)
                          //}

                          //console.log(typeof(this.jobData['time'][0]))

                          //this.graphData = [{"name":this.varY, "series":[]}]

                          //sort x-axis values by order
                          //this.jobData[this.varX].sort()
                          //console.log(this.jobData[this.varX].length)
                          //console.log(this.graphData[])
                          //question - is there better way to do this?!
                          //for(var i = 0; i<this.jobData[this.varX].length; i++){
                          //  this.graphData[0]["series"].push({'name':this.jobData[this.varX][i], 'value':this.jobData[this.varY][i]})
                          //}

                          this.drawGraph()

                          this.isDataAvailable = true;

                        },
                        error => {
                          this.errorMessage = <any> error
                        }
                      )
  }


drawGraph(){
  this.graphData = [{"name":"", "series":[]}]
  let newData = [{"name":this.varY, "series":[]}]

  this.jobData[this.varX].sort()
  for(var i = 0; i<this.jobData[this.varX].length; i++){
    newData[0]["series"].push({'name':this.jobData[this.varX][i], 'value':this.jobData[this.varY][i]})
  }
  this.xAxisLabel = this.varX
  this.yAxisLabel = this.varY
  this.graphData = newData
}

onChangeX(key){
  this.varX = key
  this.drawGraph()
}

onChangeY(key){
  this.varY = key
  this.drawGraph()
}

}
