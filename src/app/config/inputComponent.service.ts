import { Injectable } from '@angular/core';

import {InputComponent} from './inputComponent';


@Injectable()
export class InputComponentService {

  getFamilyTags(components): {name: string, id: string, collapse: boolean} [] {
    var tags = []
    for (var key in components) {
        tags = tags.concat(components[key].tag)
    }

    var flags = {};
    var uniqueTags = tags.filter(function(tag) {
        if (flags[tag.id]) {
            return false;
        }
        flags[tag.id] = true;
        return true;
    });
    return uniqueTags  
  }

  getComponentsOfFamily(allComponents, tag:{name: string, id: string, collapse: boolean}): InputComponent[] {
      let components = []
      for (var key in allComponents){
            if (allComponents[key].tag[0].label.indexOf(tag) > -1){
                components.push(allComponents[key])
            }
          }

      return components
  }

//   filterSelectedFamilies(allComponents,selectedTags:{name:string, checked: boolean} []): InputComponent[] {
//       let checkedTags = selectedTags.filter(function (tag:{name:string, checked: boolean}) {
//           return tag.checked == true
//       })
//       let selectedComponents = []
//     //   console.log(allComponents)
//       for (let tag of checkedTags) {
//           for (var key in allComponents){
//             //   console.log(key)
//               if (allComponents[key].tag.indexOf(tag.name) > -1){
//                   selectedComponents.push(allComponents[key])
//               }
//           }
//       }

//       return selectedComponents
//   }
}
