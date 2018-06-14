import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobInfo } from '../types/jobInfo'
import { OutputService } from './output.service';
import { FieldsTemplate } from '../types/fieldsInfo';
import { ChartComponent } from './chart/chart.component';
import { InputComponent } from '../components/input/inputComponent';

import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Component({
  providers: [OutputService],
  templateUrl: './output.component.html',
  styleUrls:['./output.component.css'],
  // styles: [require('./output.component.css').toString()]
})

export class OutputComponent implements OnInit {
  job: JobInfo;
  job_id: string;
  fields:FieldsTemplate[]
  families:{name: string, label: string, collapse: boolean, parameters: InputComponent[]} []
  chart:{} = {collapse:false}
  config:{} = {collapse:false}
  errorMessage: string;
  type: string = 'Output';
  status: string = 'Error';
  haveData: boolean;
  relativeCreationTime: string;
  relativeStartTime: string;
  relativeEndTime: string;
  flatParametersList: Array<any>;

  constructor(
      private activatedRoute: ActivatedRoute,
      private outputService: OutputService
    ) {}

  ngOnInit() {
    this.families = []
    this.flatParametersList=[]
    this.getData();
  }

  flattenFamiliesStructure() {
    this.families.forEach(family => {
      family.parameters.forEach(parameter => {
        let parameterList = {"family":family.label, 
          "name":parameter.label, 
          "unit":parameter.units,
          "value":parameter.value,
          "default":parameter.value,
        }  
        this.flatParametersList.push(parameterList);
      })
    })
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
      let step =  this.getComponentProperty(child_field, "step");
      let value = this.getComponentProperty(child_field, "default");
      let help = "help me"
      let prefix =this.getComponentProperty(child_field, "prefix");
      let aComponent = new InputComponent (name, type, label, units, min, max, step,value, help, prefix);
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

  getData(){
    this.outputService.getJob()
                    .subscribe(
                      allJobsInfo => {
                        console.log(allJobsInfo)
                        this.job = allJobsInfo
                        this.status = this.job.status
                        this.temporalDistanceFromCreation()
                        this.haveData = true
                        this.fields = allJobsInfo["parent_case"]["fields"]
                        this.serializeFieldsToFamilies();
                        this.serializeValuesToFamilies(allJobsInfo["values"]);
                        this.flattenFamiliesStructure()
                        this.job.outputs = allJobsInfo.outputs;
                        // this.job.outputs = [
                        //   {
                        //       "type": "zip",
                        //       "destination_path": "https://sgmiddleware.blob.core.windows.net/dambreakoutput/12/output.zip"
                        //   }
                        // ]
                        // console.log(this.job.families);
                        // console.log(allJobsInfo);
                      },
                      error => {
                        this.errorMessage = <any> error
                      });
  }

  temporalDistanceFromCreation() {
    this.relativeCreationTime = moment(this.job.creation_datetime).fromNow()
    this.relativeStartTime = moment(this.job.start_datetime).fromNow()
    this.relativeEndTime = moment(this.job.end_datetime).fromNow()
  }

  // chartCollapse() {
  //    this.chart['collapse'] = !this.chart['collapse']
  //  }

  // configCollapse() {
  //    this.config['collapse'] = !this.config['collapse']
  //  }

}
