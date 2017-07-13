import { Injectable } from '@angular/core';

import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class InputComponentService {
  getInputComponents(): InputComponent[] {
      return INPUT_COMPONENTS;
  }

  getFamilyTagsOld(): {name:string, checked: boolean} [] {
      var tags = []
      for (var e=0; e < INPUT_COMPONENTS.length; e++) {
        tags = tags.concat(INPUT_COMPONENTS[e].tag)
      }

      var uniqueTags = tags.filter(function(item, i, ar){

        return ar.indexOf(item) === i; });

      var familyTags = []
      for (let tag of uniqueTags) {
          familyTags.push({"name": tag, "checked": false})
      }
      return familyTags
  }

  getFamilyTags(components): {name:string, checked: boolean} [] {
      var tags = []
      for (var key in components) {
        tags = tags.concat(components[key].tag)
      }
      
      var uniqueTags = tags.filter(function(item, i, ar){
        return ar.indexOf(item) === i; });

      var familyTags = []
      for (let tag of uniqueTags) {
          familyTags.push({"name": tag, "checked": false})
      }
      console.log(familyTags)
      return familyTags
  }

  toggleFamilyTag(tag:string, tags:{name:string, checked: boolean} []): {name:string, checked: boolean} [] {
      let newTags = tags.slice(0)
      newTags.forEach(element => {
                                if (element.name === tag['name'])
                                    element.checked = !element.checked
      });
      return newTags
  }

  filterSelectedFamilies(allComponents,selectedTags:{name:string, checked: boolean} []): InputComponent[] {
      let checkedTags = selectedTags.filter(function (tag:{name:string, checked: boolean}) {
          return tag.checked == true
      })
      let selectedComponents = []
      console.log(allComponents)
      for (let tag of checkedTags) {
          for (var key in allComponents){
              console.log(key)
              if (allComponents[key].tag.indexOf(tag.name) > -1){
                  selectedComponents.push(allComponents[key])
              }
          }
      }

      return selectedComponents
  }
}
