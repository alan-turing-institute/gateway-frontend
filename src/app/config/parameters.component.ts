import { Component, Injectable, OnInit} from '@angular/core';
import { InputComponent } from './inputComponent';
import { InputComponentService } from './inputComponent.service';
import { ConfigDataService } from './configData.service';
// import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
    selector: 'parameters',
  providers:[InputComponentService],
  templateUrl: './parameters.component.html',
  styles:[require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
  require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
  require('./config.component.css').toString()]
})

export class ParametersComponent implements OnInit {

  supersetComponents:InputComponent []
  selectedComponents:InputComponent []
  tags:{name: string, id: string, collapse: boolean} []
  mode = 'Observable';
  errorMessage: string;

  constructor(private configDataService:ConfigDataService,
    private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.tags = []
    this.supersetComponents = []
    this.selectedComponents = []
    console.log(localStorage.getItem('template_id'));
    this.getTemplateData()
    console.log("got data")
  }

  getTemplateData () {
    this.configDataService.template
                        .subscribe(
                          supersetComponents => {
                            this.supersetComponents = supersetComponents
                            this.tags = this.inputComponentService.getFamilyTags(this.supersetComponents)
                            console.log(this.tags)
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  getDataTarget(tag) {
    return "#" + tag.id
  }

  getVisibleComponents(tag) {
    return this.inputComponentService.getComponentsOfFamily(this.supersetComponents, tag.label);
  }

  updateSlider(component, event) {
    let newValue = event.from;
    this.supersetComponents = this.configDataService.updateJobData(this.supersetComponents, component.name, newValue)
  }


  update(component) {
    if (component.type == "radio")
      component.value = !component.value
    this.supersetComponents = this.configDataService.updateJobData(this.supersetComponents, component.name,  component.value)
    console.log(this.supersetComponents)
  }

  toggleCollapse(tag) {
    let element = document.getElementById(tag.id)
    let tagToToggle = this.tags.filter(function(x) { if (x.id === tag.id) return x });
    for (var _i = 0; _i < tagToToggle.length; _i++) {
      tagToToggle[_i].collapse = !tagToToggle[_i].collapse
    }

  }
}
