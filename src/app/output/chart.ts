import { Component, Input, OnInit, NgZone, OnChanges, ViewChild, ElementRef, HostListener  } from '@angular/core';

import { OutputService } from './output.service';

@Component({
  selector: 'chart',
  providers: [OutputService],
  template: `
  <div class='container-fluid'>

    <div class="card-block">
      <div class = "row">
        <div class = "col-md-12">
          <div *ngIf="isDataAvailable" style="width:100%; min-height: 300px">
            <ngx-charts-line-chart

            [scheme]="colorScheme"
            [results]="chartData"
            [gradient]=false
            [xAxis]=true
            [yAxis]=true
            [legend]=false
            [showXAxisLabel]=true
            [showYAxisLabel]=true
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [autoScale]=true
            [tooltipDisabled]=false>œ
          </ngx-charts-line-chart>
        </div>
      </div>
    </div>

    <div class = "row">

      <div class = "col-md-6">
        <select class = "form-control" (change)='onChangeY($event.target.value)' >
          <option *ngFor="let y_var of number_vars" >{{keyLabel[y_var]}}</option>
        </select>
        <div>(y axis)</div>
      </div>

      <div class = "col-md-6">
        <select class="form-control" (change)='onChangeX($event.target.value)' >
          <option *ngFor="let key of keys" >{{keyLabel[key]}}</option>
        </select>
        <div>(x axis)</div>
      </div>

    </div>

  </div>
</div>`,
  inputs:['lineChartLabel', 'lineChartData']
})


export class ChartsComponent implements OnInit{


  errorMessage: string;
  jobData: {};
  keys: Array<any>;
  labels: Array<any>;
  units: Array<any>;
  keyLabel: Object = {};
  labelKey: Object = {};
  keyUnits: Object = {};
  number_vars: Array<any> = [];
  data: Array<any> = [];
  isDataAvailable:boolean = false;
  varX: string;
  varY: string;
  chartData: Array<any>

  // ngx-charts options

  //view: any[] = [500, 400];

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

                          // this.jobData is keyed by variable names
                          // "varName: [data]"
                          this.keys = this.jobData["keys"];
                          this.labels = this.jobData["labels"];
                          this.units = this.jobData["units"];

                          // create a label lookup object
                          var self = this;
                          this.keys.forEach(function (value, i) {
                            self.keyLabel[value] = self.labels[i];
                          });

                          // create a units lookup object
                          var self = this;
                          this.keys.forEach(function (value, i) {
                            self.keyUnits[value] = self.units[i];
                          });

                          // create a key lookup object
                          var self = this;
                          this.labels.forEach(function (value, i) {
                            self.labelKey[value] = self.keys[i];
                          });

                          // this.data is an Array
                          // [data, data, data]
                          // this.number_vars is an Array
                          // [key, key, key]
                          for (let key of this.keys) {
                            this.data.push(this.jobData[key])
                            if (typeof(this.jobData[key][0]) === 'number'){
                              this.number_vars.push(key)
                            }
                          }


                          // plot first 2 vars against each other
                          this.varX = this.number_vars[0]
                          this.varY = this.number_vars[1]

                          // reorder number_vars (labels) so that the visible
                          // choice in the menu corresponds to the Y variable shown
                          let temp = this.number_vars[0]
                          this.number_vars[0] = this.number_vars[1]
                          this.number_vars[1] = temp

                          this.drawChart()

                          this.isDataAvailable = true;

                        },
                        error => {
                          this.errorMessage = <any> error
                        }
                      )
  }

drawChart(){

  // At this point varX and varY are known (both are key strings
  // specifying the X and Y variables to plot)

  let newData = {"name":this.varY, "series":[]}
  let type = typeof(this.jobData[this.varX][0])

  // let date = new Date(this.jobData[this.varX][0]).toString()œ


  // TODO refactor the code below into a function that converts
  // "sample_x": [1, 2]
  // "sample_y": [10, 24]
  //
  // to:
  // [{"name": 1, "value": 10}, {"name": 2, "value": 24}]


  for(var i = 0; i<this.jobData[this.varX].length; i++){
    //var is a number - need to check first otherwise numbers will be treated as dates
    // if(type==='number'){
      newData.series.push({
        'name':this.jobData[this.varX][i],
        'value':this.jobData[this.varY][i]
      })
    // }
    // //the var is a valid date string
    // else if(date !== 'Invalid Date'){
    //   newData.series.push({
    //     'name':new Date(this.jobData[this.varX][i]),
    //     'value':this.jobData[this.varY][i]}
    //   )
    // //the var is a string i.e. category
    // }else{
    //   newData.series.push({
    //     'name':this.jobData[this.varX][i],
    //     'value':this.jobData[this.varY][i]
    //   })
    // }
  }

  // this.xAxisLabel = this.keyLabel[this.varX]+"("+this.keyUnits(this.varX)+")"
  let xText = this.keyLabel[this.varX]
  let xLabel = xText.concat(" ("+this.keyUnits[this.varX]+")")

  this.xAxisLabel = xLabel

  let yText = this.keyLabel[this.varY]
  let yLabel = yText.concat(" ("+this.keyUnits[this.varY]+")")

  this.yAxisLabel = yLabel

  this.chartData = [newData]

}

onChangeX(key){
  this.varX = this.labelKey[key]
  this.drawChart()
}

onChangeY(number_var){
  this.varY = this.labelKey[number_var]
  this.drawChart()
}

}
