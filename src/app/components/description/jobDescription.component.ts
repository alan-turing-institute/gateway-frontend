import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { JobInfo } from '../../dashboard/jobInfo';

@Component({
  selector: 'jobDescription',
  templateUrl: 'jobDescription.component.html',
  styleUrls: ['jobDescription.css']
})

export class JobDescriptionComponent{
  @Input() info: JobInfo; 
}