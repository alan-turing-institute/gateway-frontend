import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../inputComponent';

@Component({
  selector: 'textInput',
  templateUrl: 'text.component.html',
  styleUrls: ['text.css']
})

export class TextComponent implements OnInit{
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