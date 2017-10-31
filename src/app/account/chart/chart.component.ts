import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';



@Component({
  selector: 'simulations-allocation',
  template: `
    <ngx-charts-pie-chart
      [scheme]="colorScheme"
      [view]="view"
      [results]="single"
      [legend]="showLegend"
      [explodeSlices]="explodeSlices"
      [labels]="showLabels"
      [doughnut]="doughnut"
      [gradient]="gradient"
      (select)="onSelect($event)">
    </ngx-charts-pie-chart>
  `
})
export class ChartComponent {
  single: any[];
  view: any[] = [400, 300];
  showLegend = false;
  colorScheme = {
    domain: ['#2b4656', '#78c1ec']
  };
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  constructor() {
    this.single = [
        {
          "name": "Ran",
          "value": 5
        },
        {
          "name": "Remain",
          "value": 10
        },
      ];
    Object.assign(this, this.single)   
  }
  
  onSelect(event) {
    console.log(event);
  }
  
}