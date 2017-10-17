import { Component, Injectable, OnInit, Input} from '@angular/core';
import { Router} from '@angular/router';
import { InputComponent } from '../components/input/inputComponent';
import { CaseInfo } from '../components/description/caseInfo';
import { ConfigDataService } from './configData.service';

@Component({
  selector:"config",
  templateUrl: './config.component.html',
  styles:[require('./config.component.css').toString()]
})

export class ConfigComponent implements OnInit {
  case:CaseInfo
  families:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  job: {name:string, status:string, description:string, id:string}
  errorMessage: string;
  jobExistsOnServer:boolean;
  minimalJobInfoCollected:boolean;

  constructor(
    private configDataService:ConfigDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.families = []
    this.case = new CaseInfo
    this.minimalJobInfoCollected = false
    this.jobExistsOnServer = false
    this.job = {'name': "", 'description':"", 'status':"", id:""}
    this.getData()
  }

  getDataTarget(family) {
    return "#" + family.name
  }

  getComponentsOf(family) {
    return family['parameters']
  }

  setMinimalJobInfoCollected () {
    console.log("changing")
    if ((this.job.description.length > 0) && (this.job.name.length > 0))
      this.minimalJobInfoCollected = true  
  }

  onUpdated(component, value:string) {
    // console.log("Parent receive new value: "+value)
    component.value = value
    // overwrite with an array copy via .slice() method
    // to trigger angular change detection ngOnChanges()
    for (var i in this.families) {
      this.families[i].parameters = this.families[i].parameters.slice()
    }
    this.setMinimalJobInfoCollected()
  }

  toggleCollapse(family) {
    let element = document.getElementById(family.name)
    let familyToToggle = this.families.filter(function(x) { if (x.name === family.name) return x });
    for (var _i = 0; _i < familyToToggle.length; _i++) {
      familyToToggle[_i].collapse = !familyToToggle[_i].collapse
    }
  }

  getData () {
    let action_type = localStorage.getItem('action_type');
    if (action_type === 'Edit') {
      this.jobExistsOnServer = true
      let job_id = localStorage.getItem('job_id');
      let url = this.configDataService.getJobUrl(job_id)
      this.configDataService.getJob(url)
                        .subscribe(
                          config => {
                            this.families = config['families']
                            this.case=config['case']
                            this.job.name = config['name']
                            this.job.description = config['description']
                            this.job.status = config['status']
                            this.job.id = config['id']
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
    }
    else {
      this.jobExistsOnServer = false
      let template_id = localStorage.getItem('template_id');
      this.configDataService.getTemplate(template_id)
                        .subscribe(
                          template => {
                            this.families = template['families']
                            this.case=template['case']
                            this.job.status = template['status']
                            this.job.id = template['id']
                            // Do not load name or description, as API template doesn't give desirable values
                            // Keep as empty
                          },
                          error => {
                            this.errorMessage = <any> error
                          });

    }
  }

  saveJob() {
    if (this.jobExistsOnServer) {
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
                          this.jobExistsOnServer = true
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
}
