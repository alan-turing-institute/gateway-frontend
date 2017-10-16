import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../inputComponent';

@Component({
  selector: 'sliderInput',
  templateUrl: 'slider.component.html',
//   styleUrls: ['slider.css']
  styles:[require('../../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./slider.css').toString()]
})

export class SliderInputComponent implements OnInit{
  @Input() data: InputComponent; 
  @Output() onUpdated = new EventEmitter<string>();
  previousValue:string
  
  ngOnInit () {
    // console.log("Adding: "+this.data.type)
  }

  valueValidated(newValue):boolean {
    if ((parseFloat(this.data.value) >= parseFloat(this.data.min_value)) 
      && (parseFloat(this.data.value) <= parseFloat(this.data.max_value)))
      return true
    else
      return false
  }

  update (event) {
    let newValue = event.from;
    if (this.valueValidated(newValue)) {
      this.previousValue = newValue
      this.onUpdated.emit(newValue.toString())
    }  
    else 
      this.data.value = this.previousValue
  }
}