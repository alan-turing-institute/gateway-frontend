import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationsService } from '../simulations.service';


@Component({
  selector: 'app-simulations-view',
  templateUrl: './view.component.html',
  providers: [ SimulationsService ]
})
export class SimulationsViewComponent implements OnInit {

  jobs: any[];
  error: any;

  constructor(private simulationsService: SimulationsService) { }

  ngOnInit() {
    this.showJobs();
  }

  showJobs() {
    this.simulationsService.getJobs()
      .subscribe(
        (data: any) => this.jobs = data, // success path
       error => this.error = error // error path
    );
  }

}
