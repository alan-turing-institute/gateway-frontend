import { Component, Injectable, OnInit} from '@angular/core';

import { InputComponent } from './inputComponent';
import { InputComponentService } from './inputComponent.service';
import { JobDataService } from './jobData.service';
import {IonRangeSliderComponent} from 'ng2-ion-range-slider';

@Component({
  selector: 'case-assemble',
  providers:[InputComponentService],
  template:`
  <!--
  <div>
    <div *ngFor="let tag of tags" class="btn-group" data-toggle="buttons">
      <label class="btn btn-secondary"  [class.selected]="tag.checked===true">
        <input type="checkbox"
              [checked]="tag.checked"
              (change)="toggleFamily(tag)">{{tag.name}}
      </label>
    </div>
    <case-parameters [families]="tags"></case-parameters>
  </div>-->

  <div>
    <div id="accordion" role="tablist">
      <div *ngFor="let atag of tags" class="card">
        <div class="card-header" role="tab" id="headingOne">
          <h5 class="mb-0">
            <a data-toggle="collapse" href={{getTagHash(atag.tag)}} >
              {{atag.tag.label}}
            </a>
          </h5>
        </div>
        <div id={{atag.tag.id}} class="collapse show" role="tabpanel" data-parent="#accordion">
          <div class="card-block">
            <div *ngFor="let component of getVisibleComponents(atag.tag)">
              <div *ngIf="component.type == 'text'">
                <label for={{component.name}}>{{component.label}}</label>
                <div class="input-group">
                  <input
                    [(ngModel)]="component.value"
                    id={{component.name}}
                    type="text"
                    class="form-control">
                  <span class="input-group-addon">{{component.units}}</span>
                </div>
              </div>
              <div *ngIf="component.type == 'slider'">
                <label for={{component.name}}>{{component.label}}</label>
                <ion-range-slider id={{component.name}}
                  from={{component.value}}
                  min={{component.min_value}}
                  max={{component.max_value}}
                  postfix=" {{component.units}}"
                  data-step=0.01
                  (onFinish)="update(component, $event)"></ion-range-slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./assemble.component.css']
})

export class AssembleComponent implements OnInit {

  supersetComponents:InputComponent []
  selectedComponents:InputComponent []
  tags:{tag:{name: string, id: string}, checked: boolean} []
  mode = 'Observable';
  errorMessage: string;

  constructor(private jobDataService:JobDataService,
    private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.tags = []
    this.getJobData()
  }

  getJobData () {
    this.jobDataService.data
                        .subscribe(
                          supersetComponents => {
                            this.supersetComponents = supersetComponents
                            this.tags = this.inputComponentService.getFamilyTags(this.supersetComponents)
                          },
                          error => {
                            this.errorMessage = <any> error
                          });
  }

  toggleFamily(tag) {
    this.tags = this.inputComponentService.toggleFamilyTag(tag, this.tags)
    
  }

  getTagHash(tag) {
    return "#"+tag.id
  }

  getVisibleComponents(tag) {
    // console.log(tag)
    return this.inputComponentService.getComponentsOfFamily(this.supersetComponents, tag.label);
  }

  test() {
    console.log(this.supersetComponents);
  }

}


// <div>
//   <button (click)="test()">Test AssembleComponent</button>
// </div>
