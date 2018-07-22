import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simulations-view',
  templateUrl: './view.component.html',
})
export class SimulationsViewComponent implements OnInit {

  jobs: any[];
  error: any;

  constructor() { }

  ngOnInit() {
    this.showJobs();
  }

  showJobs() {

  }

}
