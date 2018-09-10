import { Component, Input } from '@angular/core';

@Component({
  selector: 'sim-metrics',
  templateUrl: 'metrics.component.html',
})
export class MetricsComponent {
  @Input() metrics: object;
}
