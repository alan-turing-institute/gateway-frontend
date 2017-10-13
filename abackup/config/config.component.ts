import { Component, Injectable, OnInit, Input} from '@angular/core';
import { Router} from '@angular/router';
import { InputComponent } from './inputComponent';
import { CaseInfo } from '../cases/case/caseInfo';

import { ConfigDataService } from './configData.service';
import { OutputService } from '../output/output.service';
import { DescriptionComponent } from './description.component';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

// Modal component for use on config page "Run" job
// TODO: this component should be made globally available
// via app level declaration

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">Submitting simulation</h4>
    </div>
    <div class="modal-body">
    <p>Submitting simulation to Imperial College "cx1" cluster.</p>
    </div>
  `
})


export class ModalContentComponent {
  public title: string;
  public list: any[] = [];
  constructor(public bsModalRef: BsModalRef) {}
}


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
  jobCreated:boolean;
  jobName:string="New Job"

  bsModalRef: BsModalRef;

  constructor(
    private configDataService:ConfigDataService,
    private outputService:OutputService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.tags = []
    this.case = new CaseInfo
    this.job = {'name': "Name of job here", 'description':"Description of job here"}
    this.getData()
    this.validFormValues = true
  }

  public showRunMessage() {
    this.bsModalRef = this.modalService.show(ModalContentComponent);
  }

  public hideRunMessage() {
    this.bsModalRef.hide();
  }

  saveJob() {
    if (this.jobCreated) {
      // console.log("editing job")
      this.job.status = "Draft"
      let url = this.configDataService.getSaveJobURL(this.job['id'])
      this.configDataService.saveJob(this.job, url)
                        .subscribe(
                          saveJob => {
                            // console.log("saved bloody job")
                            // console.log(saveJob)
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
    }
    else {
      // console.log("creating job")
      this.job.status = "Draft"
      let url = this.configDataService.getCreateJobURL(this.job['id'])
      this.configDataService.createJob(this.job, url)
                      .subscribe(
                        createJob => {
                          // console.log("created bloody job")
                          this.jobCreated = true
                          // console.log(createJob)
                        },
                        error => {
                          this.errorMessage = <any> error
                        });
    }
  }

  runJob () {
    // this.job.status = "Queued"
    localStorage.setItem('job_id', this.job.id);
    let url = this.configDataService.getSaveJobURL(this.job['id'])

    let that = this;
    that.showRunMessage();
    this.configDataService.saveJob(this.job, url).subscribe(
                        saveJob => {
                          this.configDataService.runJob(this.job)
                            .subscribe(
                              ranJob => {
                                console.log("ran job")
                                console.log(ranJob)
                                that.hideRunMessage()
                                // this.router.navigate(['../../output/output'])
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
    // overwrite with an array copy via .slice() method
    // to trigger angular change detection ngOnChanges()
    for (var i in this.tags) {
      this.tags[i].parameters = this.tags[i].parameters.slice()
    }
  }

  update(tag, component) {
    if (this.validateValue(component)) {
      if (component.type == "radio")
        component.value = !component.value

      if (component.type == "text")
      this.configDataService.updateJobData(tag['parameters'], component.name,  component.value.toString())
    }
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

  getData () {
    if (this.type == "Output") {
      console.log(localStorage.getItem('job_id'));
      this.outputService.info
                          .subscribe(
                            template => {
                              this.tags = template['families']
                              console.log('calling output service from config component')
                              console.log(this.tags)
                              this.case=template['case']
                              this.job = template
                              console.log(this.job)
                            },
                            error => {
                              this.errorMessage = <any> error
                            });
    }
    else {
      let action_type = localStorage.getItem('action_type');

      if (action_type === 'Edit') {
        this.jobCreated = true
        let job_id = localStorage.getItem('job_id');
        let url = this.configDataService.getJobUrl(job_id)
        this.configDataService.getJob(url)
                          .subscribe(
                            config => {
                              this.job = config
                              this.tags = config['families']
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
                              this.tags = template['families']
                              this.setValidValues (this.tags)
                              // console.log(this.tags)
                              this.case=template['case']
                              this.job = template
                            },
                            error => {
                              this.errorMessage = <any> error
                            });

      }

    }
  }
}