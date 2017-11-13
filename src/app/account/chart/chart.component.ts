import {Component, Input, OnInit,NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import { CounterData } from '../../types/counterData';

@Component({
  selector: 'simulations-allocation',
  // template: `
  //   <ngx-charts-pie-chart
  //     [scheme]="colorScheme"
  //     [view]="view"
  //     [results]="single"
  //     [legend]="showLegend"
  //     [explodeSlices]="explodeSlices"
  //     [labels]="showLabels"
  //     [doughnut]="doughnut"
  //     [gradient]="gradient"
  //     (select)="onSelect($event)">
  //   </ngx-charts-pie-chart>
  // `

  template: `
    tally = {{data.tally}}, credit = {{data.credit}}
  `

})
export class ChartComponent implements OnInit{
  @Input() data: CounterData;
  // data: object = {tally: 10, credit: 30};

  single: any[];
  view: any[] = [400, 300];
  showLegend = false;
  colorScheme = {
    domain: ['#2b4656', '#78c1ec']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    console.log("In chart component")
    console.log("data:", this.data)
    // console.log(this.data['tally'])
    // console.log(this.data['credit'])
    this.single = [
      // {
      //   "name": "Used",
      //   "value": Number(this.data['tally'])
      // },
      // {
      //   "name": "Remaining",
      //   "value": Number(this.data['credit'])
      // },
    ];
  }

}
