import { Component, Input, OnInit, NgZone, OnChanges, ViewChild, ElementRef, HostListener  } from '@angular/core';

import { OutputService } from './output.service';

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
          <div class = "row">
          <div class = "col-md-12">

      <div *ngIf="isDataAvailable">
          <ngx-charts-line-chart
          [view]="view"
          [scheme]="colorScheme"
          [results]="graphData"
          [gradient]=false
          [xAxis]=true
          [yAxis]=true
          [legend]=false
          [showXAxisLabel]=true
          [showYAxisLabel]=true
          [xAxisLabel]="xAxisLabel"
          [yAxisLabel]="yAxisLabel"
          [autoScale]=true
          [tooltipDisabled]=false>
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


  errorMessage: string;
  jobData: {};
  keys: Array<any>;
  y_vars: Array<any> = [];
  data: Array<any> = [];
  isDataAvailable:boolean = false;
  varX: string;
  varY: string;
  x_type: string;
  graphData: Array<any>

  // ngx-charts options
  view: any[] = [700, 400];
  xAxisLabel = '';
  yAxisLabel = '';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

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
                          }

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

                          this.drawGraph()

                          this.isDataAvailable = true;

                        },
                        error => {
                          this.errorMessage = <any> error
                        }
                      )
  }


drawGraph(){
  //this.isDataAvailable = false
  this.graphData = [{"name":"", "series":[]}]
  let newData = [{"name":this.varY, "series":[]}]
  this.jobData[this.varX].sort()
  for(var i = 0; i<this.jobData[this.varX].length; i++){
    newData[0]["series"].push({'name':this.jobData[this.varX][i], 'value':this.jobData[this.varY][i]})
  }
  this.xAxisLabel = this.varX
  this.yAxisLabel = this.varY
  this.graphData = newData
  //this.isDataAvailable = true
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
