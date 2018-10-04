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
  `,
})
export class ClassifierComponent implements OnInit, OnChanges {
  @Input()
  classifier: object;
  @ViewChild('chartref', { read: ElementRef })
  chartref;

  chart: any;

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

    this.chart.scale({ y: { sync: true }, x: { sync: true } });

    let view = this.chart.view();
    view.source(this.classifier['classifier']);

    view
      .polygon()
      .position('x*y')
      // .opacity(0.65)
      .color('val', 'blue-red')
      .tooltip('val');

    // this.chart.tooltip({
    //   containerTpl:
    //     '<div class="g2-tooltip">' +
    //     '<p class="g2-tooltip-title">FOO</p>' +
    //     '<table class="g2-tooltip-list"></table>' +
    //     // '<img src="https://raw.githubusercontent.com/alan-turing-institute/simulate-damBreak/master/thumbnail.png">' +
    //     '</div>',
    //   itemTpl:
    //     // '<tr class="g2-tooltip-list-item"><td style="color:{color}">{name}</td><td>{value}</td></tr>',
    //     '<tr class="g2-tooltip-list-item">Test</tr>',
    //   offset: 50,
    //   'g2-tooltip': {
    //     position: 'absolute',
    //     visibility: 'hidden',
    //     border: '1px solid #efefef',
    //     backgroundColor: 'white',
    //     color: '#000',
    //     opacity: '0.8',
    //     padding: '5px 15px',
    //     transition: 'top 200ms,left 200ms',
    //   },
    //   'g2-tooltip-list': {
    //     margin: '10px',
    //   },
    // });

    view = this.chart.view();
    this.chart.tooltip({ showTitle: false });
    this.chart.legend(false);

    view.axis(false);
    view.source(this.classifier['train']);

    // TODO hide legend for points (make custom legend that demarks testing and training)
    view
      .point()
      .position('x*y')
      .tooltip('val')
      .color('val')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });

    // const view = this.chart.view();
    // // view.axis(false);
    // view.source(this.classifier['test']);
    // view
    //   .point()
    //   .position(`x*y`)
    //   .color('val')
    //   .tooltip('val')
    //   .size(8)
    //   .shape('circle')
    //   .style({
    //     stroke: '#fff',
    //     lineWidth: 1,
    //   });

    this.chart.render();
    console.log('this.classifier', this.classifier);
  }
}
