import { Component, Injectable, OnInit} from '@angular/core';

import { InputComponent } from './inputComponent';
import { InputComponentService } from './inputComponent.service';

@Component({
  selector: 'app-assemble',
  providers:[InputComponentService],
  // templateUrl: './assemble.component.html',
  // template:`
  //   <div *ngFor="let component of supersetComponents">
  //     <div *ngIf="component.type == 'text'">
  //         <label>{{component.label}}:<input type=\"text\" name=\"name\" /></label>
  //     </div>
  //   </div>
  // `,
  template:`
    <div *ngFor="let tag of tags">
      <label>{{tag}}</label>
    </div>
  `,
  styleUrls: ['./assemble.component.css']
})

export class AssembleComponent implements OnInit {

  supersetComponents:InputComponent []
  tags:string []

  constructor(private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.supersetComponents = this.inputComponentService.getInputComponents()
    this.tags = this.inputComponentService.getInputTags()
  }

}
