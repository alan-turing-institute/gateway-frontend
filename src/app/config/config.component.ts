import { Component, Injectable, OnInit} from '@angular/core';
import { InputComponent } from './inputComponent';
import { CaseComponents } from './caseComponents';
import { InputComponentService } from './inputComponent.service';
import { ConfigDataService } from './configData.service';
// import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  providers:[InputComponentService],
  templateUrl: './config.component.html',
  styles:[require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./config.component.css').toString()]
})

export class ConfigComponent implements OnInit {

  case:CaseComponents 
  // supersetComponents:InputComponent []
  tags:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  mode = 'Observable';
  errorMessage: string;

  constructor(private configDataService:ConfigDataService,
    private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.tags = []
    this.case = new CaseComponents
    this.getTemplateData()
  }

  initNewJob() {
    console.log("logging")
    this.getTemplateData()  
  }
  getTemplateData () {
    console.log(localStorage.getItem('template_id'));
    this.configDataService.template
                        .subscribe(
                          template => {
                            this.tags = template['families']
                            this.case=template['case']
                            console.log(this.tags);
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  getDataTarget(tag) {
    return "#" + tag.name
  }

  getVisibleComponents(tag) {
    return tag['parameters']
    // return this.inputComponentService.getComponentsOfFamily(this.supersetComponents, tag.label);
  }

  updateSlider(component, event) {
    let newValue = event.from;
    // this.supersetComponents = this.configDataService.updateJobData(this.supersetComponents, component.name, newValue)
  }


  update(component) {
    if (component.type == "radio")
      component.value = !component.value
    // this.supersetComponents = this.configDataService.updateJobData(this.supersetComponents, component.name,  component.value)
    // console.log(this.supersetComponents)
  }

  toggleCollapse(tag) {
    let element = document.getElementById(tag.name)
    let tagToToggle = this.tags.filter(function(x) { if (x.name === tag.name) return x });
    for (var _i = 0; _i < tagToToggle.length; _i++) {
      tagToToggle[_i].collapse = !tagToToggle[_i].collapse
    }

  }
}
