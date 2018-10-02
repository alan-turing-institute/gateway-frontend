import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'sim-classifier',
  // template: `<g2-chart #chartref (render)="render($event)"></g2-chart>`,
  template: `{{this.classifier | json}}`,
})
export class ClassifierComponent implements OnInit, OnChanges {
  @Input()
  classifier: object;
  @ViewChild('chartref', { read: ElementRef })
  chartref;

  chart: any;
  x_name: string;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['classifier'] && !changes['classifier']['firstChange']) {
      if (this.chart) {
        // smooth transition to new classifier
        // for example when a different simulation is selected via search
        this.chart.changeData(this.data()); // tslint:disable-line
      }
    }
  }

  data(): any {
    // data processing
    console.log('data()');
    let { DataView } = DataSet;
    let dv = new DataView().source(this.classifier['data']);
    this.x_name = 'time';
    let fields = this.classifier['names'].concat([]); // copy fields to new array (rather than referencing)
    fields.splice(fields.indexOf(this.x_name), 1); // remove x variable from fields
    dv.transform({
      type: 'fold',
      fields: fields,
      key: 'type',
      value: 'value',
    });
    let data = dv.rows;

    return data;
  }

  render(el: ElementRef) {
    console.log('render()');

    this.chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: 400,
      padding: [20, 120, 95],
    });
    this.chart.source(this.data());

    // chart.scale('time', {
    //   range: [0, 1],
    // });

    this.chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });

    this.chart
      .line()
      .position(`${this.x_name}*value`)
      .color('type');
    this.chart
      .point()
      .position(`${this.x_name}*value`)
      .color('type')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    console.log('render: this.chart', this.chart);
    this.chart.render();
  }
}
