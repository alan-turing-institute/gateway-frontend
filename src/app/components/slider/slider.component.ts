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
  
  ngOnInit () {
    console.log("Adding: "+this.data.type)
  }

  update (event) {
    let newValue = event.from;
    // console.log("Child emitting new value:"+event.from)
    // console.log("Component old value: "+this.component.value)
    this.onUpdated.emit(newValue.toString())  
  }
}