import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-simulations-view',
  templateUrl: './view-page.component.html',
})
export class ViewPageComponent implements OnInit {
  jobs: any[];
  error: any;

  constructor() {}

  ngOnInit() {
    this.showJobs();
  }

  showJobs() {}
}
