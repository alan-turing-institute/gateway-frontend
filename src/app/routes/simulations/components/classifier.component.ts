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
  template: `
  <g2-chart #chartref (render)="render($event)"></g2-chart>
  <div>{{this.classifier | json}}</div>
  `,
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
    return this.classifier;
  }

  render(el: ElementRef) {
    this.chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: 400,
      padding: [20, 120, 95],
    });

    this.chart.source(this.classifier['test']);
    this.chart
      .point()
      .position(`x*y`)
      .color('type')
      .size(8)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    let view = this.chart.view();
    view.axis(false);
    view.source(this.classifier['train']);
    view
      .point()
      .position(`x*y`)
      .color('type')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    view = this.chart.view();
    view.axis(false);
    view.source(this.classifier['classifier']);
    // view
    //   .heatmap()
    //   .position('x*y')
    //   .color('val', 'blue-cyan-lime-yellow-red');
    view
      .point()
      .position(`x*y`)
      .color('type')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    this.chart.render();
  }
}
