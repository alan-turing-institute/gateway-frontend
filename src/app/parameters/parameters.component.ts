import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../assemble/inputComponent';
import { InputComponentService } from '../assemble/inputComponent.service';

@Component({
  selector: 'app-parameters',
  providers:[InputComponentService],
  // templateUrl: './parameters.component.html',
  template:`
    <div *ngFor="let component of supersetComponents">
      <div *ngIf="component.type == 'text'">
          <label>{{component.label}}:
          <input type=\"text\" 
            name={{component.name}}} 
            value={{component.options[0]}} /></label>
      </div>
    </div>
  `,
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  supersetComponents:InputComponent []
  tags:string []

  constructor(private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.supersetComponents = this.inputComponentService.getInputComponents()
    this.tags = this.inputComponentService.getInputTags()
  }

}
