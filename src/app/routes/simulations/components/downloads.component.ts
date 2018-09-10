import { Component, Input } from '@angular/core';

import { Output } from '@simulations/models/output';
import { SimulationService } from '@simulations/services/simulation.service';

@Component({
  selector: 'sim-downloads',
  templateUrl: 'downloads.component.html',
})
export class DownloadsComponent {
  @Input() outputs: Output[];

  constructor(private simulationService: SimulationService) {}

  download(output: Output) {
    this.simulationService.downloadOutput(output);
  }
}
