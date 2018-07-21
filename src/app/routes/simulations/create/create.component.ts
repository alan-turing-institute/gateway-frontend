import { Component, OnInit, ViewChild } from '@angular/core';
import { SimulationsService } from '../simulations.service';


@Component({
  selector: 'app-simulations-create',
  templateUrl: './create.component.html',
  providers: [ SimulationsService ]
})
export class SimulationsCreateComponent implements OnInit {

  cases: any[];
  error: any;

  constructor(private simulationsService: SimulationsService) { }

  ngOnInit() {
    this.showCases();
  }

  showCases() {
    this.simulationsService.getCases()
      .subscribe(
        (data: any) => this.cases = data, // success path
        error => this.error = error // error path
     );
   }

}
