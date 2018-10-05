import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

import { View, Parse, parse, Spec } from 'vega';
declare var vega: any;

import { Output } from '../models/output';

@Component({
  selector: 'sim-vega',
  template: `
    <div id="v"></div>
  `,
})
export class VegaComponent implements OnInit {
  @Input()
  graphic: Output;
  pathToData = 'assets/contour.json';
  // pathToData = 'http://vega.github.io/vega/examples/bar-chart.vg.json';
  view: View;

  constructor() {}

  ngOnInit() {
    let path = this.graphic.destination;
    console.log('path', path);

    vega
      .loader()
      .load(path)
      .then(data => {
        this.vegaInit(JSON.parse(data));
      });

    console.log(this.graphic);
  }

  public vegaInit(spec: Spec) {
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize('#v')
      .hover()
      .run();
  }
}
