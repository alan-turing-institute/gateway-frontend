import { Component, Input, OnInit, NgZone, OnChanges, ViewChild, ElementRef, HostListener  } from '@angular/core';

import { OutputService } from './output.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';


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
        <div class="row">
          <div class="col-md-12">
            <div style="display: block;"  *ngIf="isDataAvailable">
              <canvas baseChart width="400" height="400"
                        [datasets]="chartData"
                        [labels]="chartLabels"
                        [options]="chartOptions"
                        [colors]="chartColors"
                        [legend]="chartLegend"
                        [chartType]="chartType"
                        (chartHover)="chartHovered($event)"
                        (chartClick)="chartClicked($event)"></canvas>
            </div>
          </div>
          <button (click)="update()">UPDATE</button>

          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" type="button">Action</button>
              <button class="dropdown-item" type="button">Another action</button>
              <button class="dropdown-item" type="button">Something else here</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>`,
  inputs:['lineChartLabel', 'lineChartData']
})

export class ChartsComponent implements OnInit{

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  errorMessage: string;
  jobData: {};
  keys: Array<any>;
  data: Array<any>;
  dataset: Array<{data: Array<number[]> | number[], label: string}>
  isDataAvailable:boolean = false;
  current: string;

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

  chartData:Array<any>
  chartLabels:Array<any>

  chartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  chartLegend:boolean = false; //true
  chartType:string = 'line';


  // events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }

  getJobData(){
    this.outputService.data
                      .subscribe(
                        allData => {
                          this.jobData = allData
                          this.keys = this.jobData["keys"]
                          this.data = []
                          for (let key of this.keys){
                            this.data.push(this.jobData[key])
                          }
                          //draw first 2 variables against each other
                          this.chartData = [{data: this.jobData[this.keys[0]], label: this.keys[0]}]
                          this.chartLabels=this.jobData[this.keys[1]]
                          this.isDataAvailable = true;
                          this.current = this.keys[0]
                        },
                        error => {
                          this.errorMessage = <any> error
                        }
                      )
  }

//function to call to draw chart from getJobData once data is available to draw
//  refresh_chart(){
//    setTimeout(() => {
//      this.chart.chart.config.data.labels = this.chartLabels
//      this.chart.chart.config.data.datasets = this.chartData
//      this.chart.chart.update()
//    })
//  }

  public update():void {
    if(this.current == this.keys[0]){
    this.chart.chart.config.data.datasets = [{data: this.jobData[this.keys[2]], label: this.keys[2]}]
    this.chart.chart.config.data.labels = this.jobData[this.keys[3]]
    this.current = this.keys[2]
  }else{
    this.chart.chart.config.data.datasets = [{data: this.jobData[this.keys[0]], label: this.jobData[this.keys[0]]}]
    this.chart.chart.config.data.labels = this.jobData[this.keys[1]]
    this.current = this.keys[0]
  }
    this.chart.chart.update()

  }


}
