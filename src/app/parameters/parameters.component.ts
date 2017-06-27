import { Component, OnInit, Input, OnChanges, SimpleChange} from '@angular/core';
import { InputComponent } from '../assemble/inputComponent';
import { InputComponentService } from '../assemble/inputComponent.service';

@Component({
  selector: 'app-parameters',
  providers:[InputComponentService],
  // templateUrl: './parameters.component.html',
  template:`
    <!--<div *ngFor="let component of supersetComponents">
      <div *ngIf="component.type == 'text'">
          <label>{{component.label}}:
          <input type=\"text\" 
            name={{component.name}}} 
            value={{component.options[0]}}/></label>
      </div>
    </div>-->
    <div *ngFor="let component of supersetComponents">
      <div *ngIf="component.type == 'text'">
        <label for={{component.name}}>{{component.label}}</label>
        <div class="input-group">
          <input type="text" class="form-control" id={{component.name}} value={{component.options[0]}}>
          <span class="input-group-addon">{{component.units}}</span>
        </div>
      </div>
    </div>  
  `,
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit, OnChanges {
  @Input() families:{name:string, checked: boolean} []
  supersetComponents:InputComponent []

  constructor(private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.supersetComponents = []
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    this.supersetComponents = this.inputComponentService.filterSelectedFamilies(changes["families"].currentValue);    
  }

}
