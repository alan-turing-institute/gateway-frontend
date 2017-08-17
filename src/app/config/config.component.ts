import { Component, Injectable, OnInit} from '@angular/core';
import { InputComponent } from './inputComponent';
import { CaseComponents } from './caseComponents';
import { InputComponentService } from './inputComponent.service';
import { ConfigDataService } from './configData.service';
// import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  selector:"config",
  providers:[InputComponentService],
  templateUrl: './config.component.html',
  styles:[require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./config.component.css').toString()]
})

export class ConfigComponent implements OnInit {

<<<<<<< HEAD
  case:CaseComponents
  supersetComponents:InputComponent []
  selectedComponents:InputComponent []
  tags:{name: string, id: string, collapse: boolean} []
=======
  case:CaseComponents 
  job: any
  tags:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
>>>>>>> e9ba91aba77ce711f9543cfbb2cfb26192f889b9
  mode = 'Observable';
  errorMessage: string;

  constructor(private configDataService:ConfigDataService,
    private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.tags = []
    this.case = new CaseComponents
    this.getTemplateData()
  }

  newJob() {
    console.log("init new job")
    console.log(this.job)
    // this.getTemplateData()  
  }

  saveJob() {
    console.log("save job")
  }

  startJob() {
    console.log("run job")
  }


  getTemplateData () {
    console.log(localStorage.getItem('template_id'));
    this.configDataService.template
                        .subscribe(
                          template => {
                            this.tags = template['families']
                            this.case=template['case']
                            this.job = template
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
  }

  updateSlider(tag, component, event) {
    let newValue = event.from;
    this.configDataService.updateJobData(tag['parameters'], component.name, newValue)
  }

  update(tag, component) {
    if (component.type == "radio")
      component.value = !component.value
    this.configDataService.updateJobData(tag['parameters'], component.name,  component.value)
  }

  toggleCollapse(tag) {
    let element = document.getElementById(tag.name)
    let tagToToggle = this.tags.filter(function(x) { if (x.name === tag.name) return x });
    for (var _i = 0; _i < tagToToggle.length; _i++) {
      tagToToggle[_i].collapse = !tagToToggle[_i].collapse
    }

  }
}
