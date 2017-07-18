import { Injectable } from '@angular/core';

import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class InputComponentService {
  getInputComponents(): InputComponent[] {
      return INPUT_COMPONENTS;
  }

  getFamilyTags(components): {tag:{name: string, id: string}, checked: boolean} [] {
      var tags = []
      for (var key in components) {
        tags = tags.concat(components[key].tag)
      }
      
      var uniqueTags = tags.filter(function(item, i, ar){
        return ar.indexOf(item) === i; });

      var familyTags = []
      for (let tag of uniqueTags) {
          familyTags.push({"tag": tag, "checked": false})
      }
    //   console.log(familyTags)
      return familyTags
  }

  toggleFamilyTag(tag:string, tags:{tag:{name: string, id: string}, checked: boolean} []): {tag:{name: string, id: string}, checked: boolean} [] {
      let newTags = tags.slice(0)
      newTags.forEach(element => {
                                if (element['tag']['name'] === tag['name'])
                                    element['checked'] = !element['checked']
      });
      return newTags
  }

  getComponentsOfFamily(allComponents, tag:{name: string, id: string}): InputComponent[] {
      let components = []
      for (var key in allComponents){

            if (allComponents[key].tag[0].label.indexOf(tag) > -1){
                
                components.push(allComponents[key])
            }
          }

      return components
  }

  filterSelectedFamilies(allComponents,selectedTags:{name:string, checked: boolean} []): InputComponent[] {
      let checkedTags = selectedTags.filter(function (tag:{name:string, checked: boolean}) {
          return tag.checked == true
      })
      let selectedComponents = []
    //   console.log(allComponents)
      for (let tag of checkedTags) {
          for (var key in allComponents){
            //   console.log(key)
              if (allComponents[key].tag.indexOf(tag.name) > -1){
                  selectedComponents.push(allComponents[key])
              }
          }
      }

      return selectedComponents
  }
}
