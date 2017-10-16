import { Component, Injectable, OnInit, Input} from '@angular/core';
import { Router} from '@angular/router';
import { InputComponent } from '../components/inputComponent';
import { CaseInfo } from '../components/description/caseInfo';
import { ConfigDataService } from './configData.service';

@Component({
  selector:"config",
  templateUrl: './config.component.html',
  styles:[require('./config.component.css').toString()]
})

export class ConfigComponent implements OnInit {
  validFormValues: boolean
  case:CaseInfo
  families:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  job: any
  mode = 'Observable';
  errorMessage: string;
  jobCreated:boolean;
  jobName:string="New Job"

  constructor(
    private configDataService:ConfigDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.families = []
    this.case = new CaseInfo
    this.job = {'name': "Name of job here", 'description':"Description of job here"}
    this.getData()
    this.validFormValues = true
  }

  saveJob() {
    if (this.jobCreated) {
      this.job.status = "Draft"
      let url = this.configDataService.getSaveJobURL(this.job['id'])
      this.configDataService.saveJob(this.job, url)
                        .subscribe(
                          saveJob => {
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
    }
    else {
      this.job.status = "Draft"
      let url = this.configDataService.getCreateJobURL(this.job['id'])
      this.configDataService.createJob(this.job, url)
                      .subscribe(
                        createJob => {
                          this.jobCreated = true
                        },
                        error => {
                          this.errorMessage = <any> error
                        });
    }
  }

  runJob () {
    localStorage.setItem('job_id', this.job.id);
    let url = this.configDataService.getSaveJobURL(this.job['id'])

    let that = this;
    this.configDataService.saveJob(this.job, url).subscribe(
                        saveJob => {
                          this.configDataService.runJob(this.job)
                            .subscribe(
                              ranJob => {
                                this.router.navigate(['../../dashboard'])
                              },
                              error => {
                                this.errorMessage = <any> error
                              });
                        },
                        error => {
                          this.errorMessage = <any> error
                      });

  }

  getDataTarget(family) {
    return "#" + family.name
  }

  getComponentsOf(family) {
    return family['parameters']
  }

  setValidValues (families) {
    for (var t = 0; t < families.length; t++) {
      let parameters = families[t]['parameters'];
      for (var p = 0; p < parameters.length; p++) {
        parameters[p].valid = true;
      }
    }
  }

  allValuesAreValid (families):boolean {
    for (var t = 0; t < families.length; t++) {
      let parameters = families[t]['parameters'];
      for (var p = 0; p < parameters.length; p++) {
        if (parameters[p].valid===false)
          return false
      }
    }
    return true;
  }

  onUpdated(component, value:string) {
    // console.log("Parent receive new value: "+value)
    component.value = value
    // overwrite with an array copy via .slice() method
    // to trigger angular change detection ngOnChanges()
    for (var i in this.families) {
      this.families[i].parameters = this.families[i].parameters.slice()
    }
    console.log("Component new value: "+component.value)
  }

  updateName(name) {
    this.job.name = name
    this.jobName = this.job.name
  }

  updateDescription(description) {
    this.job.description = description
  }


  validateValue(component):boolean {
    if (component.type!='text')
      return true;
    else {
      if ((component.value >= component.min_value) && (component.value <= component.max_value))
          component.valid = true
      else
          component.valid = false
      this.validFormValues = this.allValuesAreValid(this.families)
      return component.valid
    }
  }

  toggleCollapse(family) {
    let element = document.getElementById(family.name)
    let familyToToggle = this.families.filter(function(x) { if (x.name === family.name) return x });
    for (var _i = 0; _i < familyToToggle.length; _i++) {
      familyToToggle[_i].collapse = !familyToToggle[_i].collapse
    }
  }

  isDisabled():boolean {
    // if (this.type === 'Output')
    //   return true
    // else
      return false
  }

  testMe() {
    console.log("test");
  }

  getData () {
    let action_type = localStorage.getItem('action_type');
    if (action_type === 'Edit') {
      this.jobCreated = true
      let job_id = localStorage.getItem('job_id');
      let url = this.configDataService.getJobUrl(job_id)
      this.configDataService.getJob(url)
                        .subscribe(
                          config => {
                            this.job = config
                            this.families = config['families']
                            console.log(config)
                            this.case=config['case']
                            if(this.job.name != null || this.job.name != ""){
                              this.jobName = this.job.name}
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
    }
    else {
      this.jobCreated = false
      let template_id = localStorage.getItem('template_id');
      console.log("template"+template_id)

      this.configDataService.getTemplate(template_id)
                        .subscribe(
                          template => {
                            this.families = template['families']
                            this.setValidValues (this.families)
                            // console.log(this.familys)
                            this.case=template['case']
                            this.job = template
                          },
                          error => {
                            this.errorMessage = <any> error
                          });

    }
  }
}
