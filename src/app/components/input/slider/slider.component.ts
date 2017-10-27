import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../inputComponent';

@Component({
  selector: 'sliderInput',
  templateUrl: 'slider.component.html',
//   styleUrls: ['slider.css']
  styles:[require('../../../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./slider.css').toString()]
})

export class SliderComponent implements OnInit{
  @Input() data: InputComponent; 
  @Output() onUpdated = new EventEmitter<string>();
  defaultValue:string
  
  ngOnInit () {
    this.defaultValue = this.data.value
    // console.log("changing value: "+this.defaultValue)
  }

  valueValidated(newValue):boolean {
    if ((Number(newValue)!=NaN) && (Number(this.data.value) >= Number(this.data.min_value)) 
      && (Number(this.data.value) <= Number(this.data.max_value))) {
      return true
    }
    else {
      // console.log (newValue + " is invalid")
      return false
    }
  }

  update (event) {
    let newValue = event.from;
    if (this.valueValidated(newValue)) {
      // this.defaultValue = newValue
      this.onUpdated.emit(newValue.toString())
      console.log("Child Emiting change: " +newValue)
    }  
    else {
      console.log("resetting to "+this.defaultValue)
      this.data.value = this.defaultValue
    }
  }
}