import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { InputComponent } from '../assemble/inputComponent';
import { InputComponentService } from '../assemble/inputComponent.service';
import { JobDataService } from '../assemble/jobData.service';

import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  selector: 'case-parameters',
  providers:[],
  template:`
    <div *ngFor="let component of visibleComponents">
      <div *ngIf="component.type == 'text'">
        <label for={{component.name}}>{{component.label}}</label>
        <div class="input-group">
          <input
            [(ngModel)]="component.value"
            id={{component.name}}
            type="text"
            class="form-control">
          <span class="input-group-addon">{{component.units}}</span>
        </div>
      </div>
      <div *ngIf="component.type == 'slider'">
        <label for={{component.name}}>{{component.label}}</label>
        <ion-range-slider id={{component.name}}
          from={{component.value}}
          min={{component.min_value}}
          max={{component.max_value}}
          postfix=" {{component.units}}"
          data-step=0.01
          (onFinish)="update(component, $event)"></ion-range-slider>
      </div>
    </div>
  `,
  styleUrls: ['./parameters.component.css']
})

export class ParametersComponent implements OnInit, OnChanges {
  @Input() families:{name:string, checked: boolean} []
  visibleComponents:InputComponent[]
  supersetComponents:InputComponent[]
  errorMessage: string;

  constructor(private jobDataService:JobDataService,
    private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.visibleComponents = []
    this.jobDataService.data
                        .subscribe(
                          supersetComponents => {
                            this.supersetComponents = supersetComponents
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    this.visibleComponents = this.inputComponentService.filterSelectedFamilies(this.supersetComponents, changes["families"].currentValue);
    // console.log(this.visibleComponents)
  }

  update(component, event) {
    console.log(component.name);
    let newValue = event.from;
    this.supersetComponents = this.jobDataService.updateJobData(this.supersetComponents, component.name, newValue)
    console.log(this.supersetComponents)
    // this.jobDataService.data



    // this.visibleComponents.forEach(element => {
    //   if(element.name==component.name) {
    //     // element.options[0] = event.from;
    //   };
    // });
  }

  test() {
    console.log(this.visibleComponents);
  }
}

// <div>
//   <button (click)="test()">Test ParametersComponent</button>
// </div>
