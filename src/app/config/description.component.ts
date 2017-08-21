import { Component, Injectable, OnInit, Input} from '@angular/core';
import { InputComponent } from './inputComponent';
import { InputComponentService } from './inputComponent.service';
import { ConfigDataService } from './configData.service';
import { CaseInfo} from '../cases/case/caseInfo';
// import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
    selector: 'description',
  providers:[InputComponentService],
  templateUrl: './description.component.html',
})

export class DescriptionComponent implements OnInit {
  @Input() case:CaseInfo;
  @Input() type:string;
  ngOnInit() {
  }
}
