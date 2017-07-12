import { Component, OnInit } from '@angular/core';

import {IonRangeSliderComponent} from "ng2-ion-range-slider";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor() { }

  simpleSlider = {name: "Simple Slider", onUpdate: undefined, onFinish: undefined};

  ngOnInit() {
  }

}
