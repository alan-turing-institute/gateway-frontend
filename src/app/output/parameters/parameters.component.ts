import { Component, OnInit, Input } from '@angular/core';
import { JobInfo } from '../../types/jobInfo';



@Component({
    providers: [],
    selector: 'job-parameters',
    templateUrl: './parameters.component.html'
})

export class JobParametersComponent implements OnInit {
    @Input() parameters:Array<any>
    
    public ngOnInit(): void {
        // console.log(this.parameters)
    }
}
