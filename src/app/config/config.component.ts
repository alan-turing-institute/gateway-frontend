import { Component, Injectable, OnInit, Input} from '@angular/core';
import { Router} from '@angular/router';
import { InputComponent } from '../components/input/inputComponent';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { CaseInfo } from '../types/caseInfo';
import { JobInfo } from '../types/jobInfo';
import { ConfigDataService } from './configData.service';
// import { BsModalService,BsModalRef } from 'ngx-bootstrap';

import { AuthService } from '../auth/auth.service';

@Component({
  selector:"config",
  templateUrl: './config.component.html',
  styleUrls:['./config.component.css']
})

export class ConfigComponent implements OnInit {
  case:CaseInfo
  families:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  job: JobInfo
  errorMessage: string;
  jobExistsOnServer:boolean;
  minimalJobInfoCollected:boolean;
  alertAvailable: boolean;
  alertText: string;
  basic:boolean

  constructor(
    private configDataService:ConfigDataService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.families = []
    this.alertAvailable = false;
    this.alertText="";
    this.case = new CaseInfo
    this.minimalJobInfoCollected = false
    this.jobExistsOnServer = false
    this.job = new JobInfo
    this.basic = false
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
    if ((this.job.description.length > 0) && (this.job.name.length > 0)){
      this.alertAvailable = true
      this.alertText = "There are unsaved changes"
      this.minimalJobInfoCollected = true
    }

  }

  onUpdated(component, value:string) {
    this.alertAvailable = true
    this.alertText = "There are unsaved changes"
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
                            this.job = config
                            this.families = config['fields']
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
                            this.job = template
                            this.job.name=""
                            this.job.description=""
                            this.families = template['fields']
                            this.case=template['case']
                            this.job.status = template['status']
                            this.job.id = template['id']

                            console.log(this.families);

                            // Do not load name or description, as API template doesn't give desirable values
                            // Keep as empty
                          },
                          error => {
                            this.errorMessage = <any> error
                          });

    }
  }

  saveJob() {
    this.alertAvailable = true

    if (this.jobExistsOnServer) {
      this.job.status = "Draft"
      let url = this.configDataService.getSaveJobURL(this.job['id'])
      this.configDataService.saveJob(this.job, url)
                        .subscribe(
                          saveJob => {
                            this.alertText = "Changes Saved"
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
                          this.alertText = "Changes Saved"
                        },
                        error => {
                          this.errorMessage = <any> error
                        });
    }
  }

  runJob () {
    localStorage.setItem('job_id', this.job.id);

    const token = localStorage.getItem('token');
    if (token) {
      console.log("counting simulation")
      this.auth.countSimulation(token)
      .then((response) => {
        console.log(response.json());
      })
      .catch((err) => {
        console.log(err);
      });
    }

    let url = this.configDataService.getSaveJobURL(this.job['id'])
    this.alertText = "Submitting Job."
    this.configDataService.saveJob(this.job, url).subscribe(
                        saveJob => {
                          this.configDataService.runJob(this.job)
                            .subscribe(
                              ranJob => {
                                this.basic = true;
                                
                              },
                              error => {
                                this.errorMessage = <any> error
                              });
                        },
                        error => {
                          this.errorMessage = <any> error
                      });

  }

  navigateToDashboard() {
    this.router.navigate(['../../dashboard'])
  }
}
