import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'sim-metrics',
  templateUrl: 'metrics.component.html',
})
export class MetricsComponent {
  @Input()
  metrics: object;
  // data: null;

  render(el: ElementRef) {
    const { DataView } = DataSet;

    const dv = new DataView().source(this.metrics['data']);

    let x_name = 'time';

    let fields = this.metrics['names'];

    // remove x variable from fields
    fields.splice(fields.indexOf(x_name), 1);

    dv.transform({
      type: 'fold',
      fields: fields,
      key: 'type',
      value: 'value',
    });

    let data = dv.rows;

    const chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: 400,
      padding: [20, 120, 95],
    });

    chart.source(data);

    // chart.scale('time', {
    //   range: [0, 1],
    // });

    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });

    chart
      .line()
      .position(`${x_name}*value`)
      .color('type');
    chart
      .point()
      .position(`${x_name}*value`)
      .color('type')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    chart.render();
  }
}
