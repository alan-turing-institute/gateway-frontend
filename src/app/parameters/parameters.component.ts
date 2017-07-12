import { Component, OnInit, Input, OnChanges, SimpleChange} from '@angular/core';
import { InputComponent } from '../assemble/inputComponent';
import { InputComponentService } from '../assemble/inputComponent.service';

@Component({
  selector: 'app-parameters',
  providers:[InputComponentService],
  template:`
    <div *ngFor="let component of visibleComponents">
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
  visibleComponents:InputComponent[]

  constructor(private inputComponentService:InputComponentService) { }

  ngOnInit() {
    this.visibleComponents = []
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    this.visibleComponents = this.inputComponentService.filterSelectedFamilies(changes["families"].currentValue);
  }

}
