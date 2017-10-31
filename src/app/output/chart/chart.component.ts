import { Component, Input, OnInit, NgZone, OnChanges, ViewChild, ElementRef, HostListener  } from '@angular/core';

import { ChartService } from './chart.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'chart',
  providers: [ChartService],
  templateUrl: "chart.component.html",
  inputs:['lineChartLabel', 'lineChartData']
})


export class ChartComponent implements OnInit {
  errorMessage: string;
  resultsData: {};
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

  xAxisLabel = '';
  yAxisLabel = '';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private chartService:ChartService){}

  ngOnInit(){
    this.getData()
  }

  getData(){
    this.chartService.getData()
                      .subscribe(
                        allData => {
                          this.resultsData = allData

                          // this.resultsData is keyed by variable names
                          // "varName: [data]"
                          this.keys = this.resultsData["keys"];
                          this.labels = this.resultsData["labels"];
                          this.units = this.resultsData["units"];

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
                            this.data.push(this.resultsData[key])
                            if (typeof(this.resultsData[key][0]) === 'number'){
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

  drawChart() {
  // At this point varX and varY are known (both are key strings
  // specifying the X and Y variables to plot)

    let newData = {"name":this.varY, "series":[]}
    let type = typeof(this.resultsData[this.varX][0])

    for(var i = 0; i<this.resultsData[this.varX].length; i++){
        newData.series.push({
          'name':this.resultsData[this.varX][i],
          'value':this.resultsData[this.varY][i]
        })
    }

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