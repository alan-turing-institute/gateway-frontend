import { Component, Injectable, OnInit} from '@angular/core';

import { InputComponent } from './inputComponent';
import { InputComponentService } from './inputComponent.service';
import { JobDataService } from './jobData.service';


@Component({
  selector: 'app-assemble',
  providers:[InputComponentService, JobDataService],
  template:`
  <div>
    <div *ngFor="let tag of tags" class="btn-group" data-toggle="buttons">
      <label class="btn btn-primary"  [class.selected]="tag.checked===true">
        <input type="checkbox"
              (change)="toggleFamily(tag)">{{tag.name}}
      </label>
    </div>
    <app-parameters [families]="tags"></app-parameters>
  </div>
  `,
  styleUrls: ['./assemble.component.css']
})

// <!--[checked]="tag.checked"
export class AssembleComponent implements OnInit {

  supersetComponents:InputComponent []
  tags:{name:string, checked: boolean} []
  mode = 'Observable';
  errorMessage: string;

  constructor(private jobDataService:JobDataService,
    private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.tags = []
    this.getJobData()
  }

  getJobData () {
    this.jobDataService.getJobData()
                        .subscribe(
                          supersetComponents => {
                            this.supersetComponents = supersetComponents
                            this.tags = this.inputComponentService.getFamilyTags(this.supersetComponents)
                            console.log(this.tags)
                            console.log(this.inputComponentService.getFamilyTagsOld())
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  toggleFamily(tag) {
    this.tags = this.inputComponentService.toggleFamilyTag(tag, this.tags)
  }
}
