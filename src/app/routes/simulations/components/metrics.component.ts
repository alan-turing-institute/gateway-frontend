import { Component, Input, ElementRef } from '@angular/core';

import { Chart } from '@antv/g2';

@Component({
  selector: 'sim-metrics',
  templateUrl: 'metrics.component.html',
})
export class MetricsComponent {
  @Input() metrics: object;
  // data: null;

  render(el: ElementRef) {
    // console.log('DEBUG(metrics.component)', this.metrics);

    const chart = new Chart({
      container: el.nativeElement,
      forceFit: true,
      height: 400,
      padding: [20, 120, 95],
    });
    chart.source(this.metrics['data']);

    chart.scale('courantMax_0', {
      min: 0,
    });
    chart.scale('time', {
      range: [0, 1],
    });
    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });
    chart.line().position('time*courantMax_0');
    chart
      .point()
      .position('time*courantMax_0')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    chart.render();
  }
}
