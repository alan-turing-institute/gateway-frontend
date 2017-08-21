import { Component, Injectable, OnInit} from '@angular/core';
// import { ActivatedRoute} from '@angular/router';
import { InputComponent } from './inputComponent';
import { CaseInfo } from '../cases/case/caseInfo';
// import { InputComponentService } from './inputComponent.service';
import { ConfigDataService } from './configData.service';

@Component({
  selector:"config",
  // providers:[InputComponentService],
  templateUrl: './config.component.html',
  styles:[require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
    require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
    require('./config.component.css').toString()]
})

export class ConfigComponent implements OnInit {
  case:CaseInfo 
  tags:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []

  mode = 'Observable';
  errorMessage: string;

  constructor(private configDataService:ConfigDataService,
    // private inputComponentService:InputComponentService
  ) { }

  ngOnInit() {
    this.tags = []
    this.case = new CaseInfo
    this.getTemplateData()
  }

  newJob() {
    console.log("init new job")
    // this.getNewJobData()  
  }

  saveJob() {
    console.log("save job")
    // this.saveJobData () {
  }

  startJob() {
    console.log("run job")
  }

  getData () {
    if (this.type == "Output") {
      console.log(localStorage.getItem('template_id'));
      this.configDataService.template
                          .subscribe(
                            template => {
                              this.tags = template['families']
                              console.log(this.tags)
                              this.case=template['case']
                              this.job = template
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
    }
    if (this.type == "Template") {
      console.log(localStorage.getItem('template_id'));
      this.configDataService.template
                          .subscribe(
                            template => {
                              this.tags = template['families']
                              console.log(this.tags)
                              this.case=template['case']
                              this.job = template
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
    }
    if (this.type == "Edit") {
      console.log(localStorage.getItem('template_id'));
      this.configDataService.template
                          .subscribe(
                            template => {
                              this.tags = template['families']
                              console.log(this.tags)
                              this.case=template['case']
                              this.job = template
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
    }

    console.log(localStorage.getItem('template_id'));
    this.configDataService.template
                        .subscribe(
                          template => {
                            this.tags = template['families']
                            console.log(this.tags)
                            this.case=template['case']
                            this.job = template
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  getTemplateData () {
    console.log("Template ID: "+localStorage.getItem('template_id'));
    this.configDataService.template
                        .subscribe(
                          template => {
                            this.tags = template['families']
                            console.log(this.tags)
                            this.case=template['case']
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  getNewJobData () {
    this.configDataService.newJob
                        .subscribe(
                          newJob => {
                            this.tags = newJob['families']
                            this.case=newJob['case']
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  saveJobData () {
    this.configDataService.saveJob
                        .subscribe(
                          saveJob => {
                            console.log(saveJob)
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
