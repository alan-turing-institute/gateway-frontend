import { Component, Injectable, OnInit, Input} from '@angular/core';
// import { ActivatedRoute} from '@angular/router';
import { InputComponent } from './inputComponent';
import { CaseInfo } from '../cases/case/caseInfo';
// import { InputComponentService } from './inputComponent.service';
import { ConfigDataService } from './configData.service';
import { DescriptionComponent } from './description.component';
// import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  selector:"config",
  // providers:[InputComponentService],
  templateUrl: './config.component.html',
  styles:[require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css').toString(),
    require('../../../node_modules/ion-rangeslider/css/ion.rangeSlider.skinFlat.css').toString(),
    require('./config.component.css').toString()]
})

export class ConfigComponent implements OnInit {
  @Input() type:string
  validFormValues: boolean
  case:CaseInfo
  tags:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  job: any
  mode = 'Observable';
  errorMessage: string;
  jobCreated:boolean


  constructor(private configDataService:ConfigDataService,
    // private inputComponentService:InputComponentService
  ) { }

  ngOnInit() {
    this.tags = []
    this.case = new CaseInfo
    this.getTemplate()
    this.jobCreated = false
    this.validFormValues = true
  }

  saveJob() {
    console.log("saving")
    if (this.jobCreated) {
      console.log("save job")
      let url = this.configDataService.getSaveJobURL(this.job['id'])
      this.configDataService.saveJob(this.job, url)
                        .subscribe(
                          saveJob => {
                            console.log(saveJob)
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
    }
    else {
      console.log("create job")
      let url = this.configDataService.getCreateJobURL(this.job['id'])
      this.configDataService.createJob(this.job, url)
                      .subscribe(
                        createJob => {
                          console.log("created bloody job")
                          this.jobCreated = true
                          console.log(createJob)
                        },
                        error => {
                          this.errorMessage = <any> error
                        });
    }
  }

  getTemplate () {
    console.log("getting template")
    this.configDataService.template
                        .subscribe(
                          template => {
                            this.tags = template['families']
                            this.setValidValues (this.tags)
                            console.log(template['id'])
                            this.case=template['case']
                            this.job = template
                            console.log(this.job)
                            console.log(this.tags)
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

  setValidValues (tags) {
    for (var t = 0; t < tags.length; t++) {
      let parameters = tags[t]['parameters'];
      for (var p = 0; p < parameters.length; p++) {
        parameters[p].valid = true;
      }
    }
  }

  allValuesAreValid (tags):boolean {
    for (var t = 0; t < tags.length; t++) {
      let parameters = tags[t]['parameters'];
      for (var p = 0; p < parameters.length; p++) {
        if (parameters[p].valid===false)
          return false
      }
    }
    return true;
  }

  updateSlider(tag, component, event) {
    let newValue = event.from;
    this.configDataService.updateJobData(tag['parameters'], component.name, newValue.toString())
  }

  update(tag, component) {
    if (this.validateValue(component)) {
      if (component.type == "radio")
        component.value = !component.value

      if (component.type == "text")
      this.configDataService.updateJobData(tag['parameters'], component.name,  component.value.toString())
    }
  }

  updateName(parameter) {
    console.log('updating')
      // this.configDataService.updateJobData(tag['parameters'], component.name,  component.value.toString())

  }

  validateValue(component):boolean {
    if (component.type!='text')
      return true;
    else {
      if ((component.value >= component.min_value) && (component.value <= component.max_value))
          component.valid = true
      else
          component.valid = false
      this.validFormValues = this.allValuesAreValid(this.tags)
      return component.valid
    }
  }

  toggleCollapse(tag) {
    let element = document.getElementById(tag.name)
    let tagToToggle = this.tags.filter(function(x) { if (x.name === tag.name) return x });
    for (var _i = 0; _i < tagToToggle.length; _i++) {
      tagToToggle[_i].collapse = !tagToToggle[_i].collapse
    }
  }

  isDisabled():boolean {
    if (this.type === 'Output')
      return true
    else
      return false
  }

  testMe() {
    console.log("test");
  }

  startJob () {
    console.log("Start a new job")
    localStorage.removeItem("job_id")
  }

  // getData2 () {
  //   if (this.type == "Output") {
  //     console.log(localStorage.getItem('template_id'));
  //     this.configDataService.template
  //                         .subscribe(
  //                           template => {
  //                             this.tags = template['families']
  //                             console.log(this.tags)
  //                             this.case=template['case']
  //                             this.job = template
  //                           },
  //                           error => {
  //                             this.errorMessage = <any> error
  //                           });
  //   }
  //   if (this.type == "Template") {
  //     console.log(localStorage.getItem('template_id'));
  //     this.configDataService.template
  //                         .subscribe(
  //                           template => {
  //                             this.tags = template['families']
  //                             console.log(this.tags)
  //                             this.case=template['case']
  //                             this.job = template
  //                           },
  //                           error => {
  //                             this.errorMessage = <any> error
  //                           });
  //   }
  //   if (this.type == "Edit") {
  //     console.log(localStorage.getItem('template_id'));
  //     this.configDataService.template
  //                         .subscribe(
  //                           template => {
  //                             this.tags = template['families']
  //                             console.log(this.tags)
  //                             this.case=template['case']
  //                             this.job = template
  //                           },
  //                           error => {
  //                             this.errorMessage = <any> error
  //                           });
  //   }

  //   console.log(localStorage.getItem('template_id'));
  //   this.configDataService.template
  //                       .subscribe(
  //                         template => {
  //                           this.tags = template['families']
  //                           console.log(this.tags)
  //                           this.case=template['case']
  //                           this.job = template
  //                         },
  //                         error => {
  //                           this.errorMessage = <any> error
  //                         });
  // }
}
