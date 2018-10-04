import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { View, Parse, parse, Spec } from 'vega';
declare var vega: any;

@Component({
  selector: 'sim-vega',
  template: `
    <div id="v"></div>
  `,
})
export class VegaComponent implements OnInit {
  pathToData = 'assets/contour.json';
  view: View;

  constructor() {}

  ngOnInit() {
    vega
      .loader()
      .load(this.pathToData)
      .then(data => {
        this.vegaInit(JSON.parse(data));
      });
  }

  public vegaInit(spec: Spec) {
    this.view = new vega.View(vega.parse(spec))
      .renderer('svg')
      .initialize('#v')
      .hover()
      .run();
  }
}
