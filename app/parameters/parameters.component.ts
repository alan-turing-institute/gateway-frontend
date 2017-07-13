import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import { InputComponent } from '../assemble/inputComponent';
import { InputComponentService } from '../assemble/inputComponent.service';

import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  selector: 'app-parameters',
  providers:[],
  // templateUrl: './parameters.component.html',
  template:`
    <div *ngFor="let component of visibleComponents">
      <div *ngIf="component.type == 'text'">
        <label for={{component.name}}>{{component.label}}</label>
        <div class="input-group">
          <input
            [(ngModel)]="component.options[0]"
            id={{component.name}}
            type="text"
            class="form-control">
          <span class="input-group-addon">{{component.units}}</span>
        </div>
      </div>
      <div *ngIf="component.type == 'slider'">
        <label for={{component.name}}>{{component.label}}</label>
        <ion-range-slider id={{component.name}}
          from={{component.options[0]}}
          min={{component.min_value}}
          max={{component.max_value}}
          data-step=0.01
          (onChange)="update(component, $event)"></ion-range-slider>
      </div>
    </div>

    <div>
      <button (click)="test()">Test ParametersComponent</button>
    </div>
  `,
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit, OnChanges {
  @Input() families:{name:string, checked: boolean} []
  // @Output() myEventEmitter = new EventEmitter<boolean>();

  visibleComponents:InputComponent []

  constructor(private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.visibleComponents = []
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    this.visibleComponents = this.inputComponentService.filterSelectedFamilies(changes["families"].currentValue);
  }

  update(component, event) {
    // console.log(component.name);
    // console.log(event.from);
    this.visibleComponents.forEach(element => {
      if(element.name==component.name) {
        // element.options[0] = event.from;
      };
    });
  }

  test() {
    console.log(this.visibleComponents);
  }

  // testEmit() {
  //   console.log("sent");
  //   this.myEventEmitter.emit(true);
  // }

}
