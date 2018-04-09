import { Component, Injectable, OnInit, Input} from '@angular/core';
import { Router} from '@angular/router';
import { InputComponent } from '../components/input/inputComponent';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { CaseInfo } from '../types/caseInfo';
import { FieldsTemplate } from '../types/fieldsInfo';
import { JobInfo } from '../types/jobInfo';
import { JobAbout } from '../types/jobAbout';
import { JobValues } from '../types/jobValues';
import { ConfigDataService } from './configData.service';
// import { BsModalService,BsModalRef } from 'ngx-bootstrap';

import { AuthService } from '../auth/auth.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector:"config",
  templateUrl: './config.component.html',
  styleUrls:['./config.component.css']
})

export class ConfigComponent implements OnInit {
  case:CaseInfo
  fields:FieldsTemplate[]
  families:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  job: JobInfo
  jobAbout: JobAbout
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
    this.minimalJobInfoCollected = false
    this.jobExistsOnServer = false
    this.job = new JobInfo
    this.jobAbout= new JobAbout
    this.case = new CaseInfo
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

  getComponentProperty(childField, property:string) {
    for (let spec of childField['specs']) {
      if (spec['name'] == property) {
        return spec['value']
      }
    }
    return "";
  }
  
  serializeFieldToFamily(aField) {
    var child_fields = aField['child_fields'];
    var components = [];
    for (let child_field of child_fields) {
      let name = child_field['name'];
      let type = "slider";
      let label = child_field['name'];
      let units = this.getComponentProperty(child_field, "units");
      let min =  this.getComponentProperty(child_field, "min");
      let max =  this.getComponentProperty(child_field, "max");
      let value = this.getComponentProperty(child_field, "default");
      let help = "help me"
      let prefix =this.getComponentProperty(child_field, "prefix");
      let aComponent = new InputComponent (name, type, label, units, min, max, value, help, prefix);
      components.push(aComponent);
    }
    var aFamily = {
      name: aField.name, 
      label: aField.name, 
      collapse: false, 
      parameters: components
    }  
    return aFamily
  }

  serializeFieldsToFamilies() {    
    for (let field of this.fields) {
      this.families.push(this.serializeFieldToFamily(field));
    }
  }

  findValueWithName(values:any, name) {
    for (let value of values) {
      if (value["name"] == name) {
        return value["value"]
      }
    }
    return ""
  }

  serializeValuesToFamilies(values:any) {    
    for (let family of this.families) {
      for (let parameter of family['parameters']){
        parameter["value"] = this.findValueWithName(values, parameter["name"])
      }  
    }
  }

  getData () {
    let action_type = localStorage.getItem('action_type');
    if (action_type === 'Edit') {
      this.jobExistsOnServer = true
      let job_id = localStorage.getItem('job_id');
      this.configDataService.getJob(job_id)
                        .subscribe(
                          config => {
                            this.job.id = config["id"]
                            this.job.name = config["name"]
                            this.job.description=""
                            this.fields = config["parent_case"]["fields"]
                            this.job.status = "Draft"

                            this.jobAbout.case_id=config["parent_case"]['id']
                            this.jobAbout.author="Myong"

                            this.case.name = config["parent_case"]["name"]
                            this.case.description = "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."

                            this.serializeFieldsToFamilies();
                            this.serializeValuesToFamilies(config["values"]);
                            // this.job = config
                            // this.fields = config['fields']
                            // // this.case=config['case']
                            // this.job.name = config['name']
                            // this.job.description = config['description']
                            // this.job.status = config['status']
                            // this.job.id = config['id']
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
                            this.fields = template['fields']
                            this.job.status = template['status']
                            this.job.id = template['id']
                            
                            this.jobAbout.case_id=template['id']
                            this.jobAbout.author="Myong"
                            this.serializeFieldsToFamilies();
                          },
                          error => {
                            this.errorMessage = <any> error
                          });

    }
  }

  serializeParameterToValue (parameter):any {
    let value = {name:parameter['name'], value:parameter['value']}
    return value
  }

  saveJob() {
    this.alertAvailable = true
    this.job.status = "Draft"
    if (!this.jobExistsOnServer) {
      let url = this.configDataService.getCreateJobURL(this.jobAbout)
      this.jobAbout.name=this.job.name
      this.configDataService.createJob(this.jobAbout, url)
                      .subscribe(
                        job_id => {
                          this.jobExistsOnServer = true
                          this.job['id'] = job_id['job_id']
                          this.alertText = "Changes Saved"
                          let jobValues = new JobValues
                          jobValues.id = this.job['id']
                          jobValues.values = [];
                          for (let family of this.families){
                            var parameters = family['parameters'].map(this.serializeParameterToValue)
                            jobValues.values = jobValues.values.concat(parameters);
                          }
                          console.log(jobValues.values);
                          let url = this.configDataService.getSaveJobURL(this.job['id'])
                          this.configDataService.saveJob(jobValues, url)
                                            .subscribe(
                                              saveJob => {
                                                this.alertText = "Changes Saved"
                                              },
                                              error => {
                                                this.errorMessage = <any> error
                                              });
                        },
                        error => {
                          this.errorMessage = <any> error
                        });
    }
    else {
      let jobValues = new JobValues
      jobValues.id = this.job['id']
      jobValues.values = [];
      for (let family of this.families){
        var parameters = family['parameters'].map(this.serializeParameterToValue)
        jobValues.values = jobValues.values.concat(parameters);
      }
      console.log(jobValues.values);
      
      let url = this.configDataService.getSaveJobURL(this.job['id'])
      this.configDataService.saveJob(jobValues, url)
                        .subscribe(
                          saveJob => {
                            this.alertText = "Changes Saved"
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
    }
  }

  // saveJob() {
  //   this.alertAvailable = true
  //   if (this.jobExistsOnServer) {
  //     this.job.status = "Draft"
  //     let url = this.configDataService.getSaveJobURL(this.job['id'])
  //     this.configDataService.saveJob(this.job, url)
  //                       .subscribe(
  //                         saveJob => {
  //                           this.alertText = "Changes Saved"
  //                         },
  //                         error => {
  //                           this.errorMessage = <any> error
  //                         });
  //   }
  //   else {
  //     this.job.status = "Draft"
  //     let url = this.configDataService.getCreateJobURL(this.jobAbout)
  //     // this.configDataService.createJob(this.jobAbout, url)
  //     this.jobAbout.name=this.job.name
  //     this.configDataService.createJob(this.jobAbout, url)
  //                     .subscribe(
  //                       createJob => {
  //                         this.jobExistsOnServer = true
  //                         this.alertText = "Changes Saved"
  //                       },
  //                       error => {
  //                         this.errorMessage = <any> error
  //                       });
  //   }
  // }

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

    // let url = this.configDataService.getSaveJobURL(this.job['id'])
    // this.alertText = "Submitting Job."
    // this.configDataService.saveJob(this.job, url).subscribe(
    //                     saveJob => {
    //                       this.configDataService.runJob(this.job)
    //                         .subscribe(
    //                           ranJob => {
    //                             this.basic = true;
                                
    //                           },
    //                           error => {
    //                             this.errorMessage = <any> error
    //                           });
    //                     },
    //                     error => {
    //                       this.errorMessage = <any> error
    //                   });

  }

  navigateToDashboard() {
    this.router.navigate(['../../dashboard'])
  }
}
