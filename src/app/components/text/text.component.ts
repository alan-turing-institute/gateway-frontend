import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { InputComponent } from '../inputComponent';

@Component({
  selector: 'textInput',
  templateUrl: 'text.component.html',
  styleUrls: ['text.css']
})

export class TextInputComponent implements OnInit{
  @Input() aComponent: InputComponent; 
  
  ngOnInit () {
    console.log(this.aComponent)
  }
}