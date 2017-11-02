import {Component, Input, OnInit,NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { AccountInfo } from '../../types/accountInfo';

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
export class ChartComponent implements OnInit{
  @Input() account: AccountInfo;
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
    console.log('FROM CHART')
    console.log(this.account)
    this.single = [
      {
        "name": "Tally",
        "value": Number(this.account['userTally'])
      },
      {
        "name": "Remaining",
        "value": Number(this.account['userCredit'])
      },
    ];
  }

}
