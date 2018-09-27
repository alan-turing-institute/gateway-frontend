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
  selector: 'sim-metrics',
  templateUrl: 'metrics.component.html',
})
export class MetricsComponent implements OnInit, OnChanges {
  @Input()
  metrics: object;
  @ViewChild('chartref', { read: ElementRef })
  chartref;

  chart: object;
  x_name: string;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metrics'] && !changes['metrics']['firstChange']) {
      if (this.chart) {
        // smooth transition to new metrics
        // for example when a different simulation is selected via search
        this.chart.changeData(this.data()); // tslint:disable-line
      }
    }
  }

  data(): any {
    // data processing
    console.log('data()');
    let { DataView } = DataSet;
    let dv = new DataView().source(this.metrics['data']);
    this.x_name = 'time';
    let fields = this.metrics['names'].concat([]); // copy fields to new array (rather than referencing)
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
