import { Injectable } from '@angular/core';
import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class InputComponentService {
    
    getInputComponents(): InputComponent[] {
        return INPUT_COMPONENTS;
    }

    getFamilyTags(): {name:string, checked: boolean} [] {
        var tags = [];
        for (var e = 0; e < INPUT_COMPONENTS.length; e++) {
            // console.log(INPUT_COMPONENTS[e].tag)
            tags = tags.concat(INPUT_COMPONENTS[e].tag) 
        }

        var uniqueTags = tags.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
        
        var familyTags = []
        for (let tag of uniqueTags) {
            familyTags.push({"name": tag, "checked": false})
        }  
        return familyTags
    }

    toggleFamilyTag(tag:string, tags:{name:string, checked: boolean} []): {name:string, checked: boolean} [] {
        let newTags = tags.slice(0)
        newTags.forEach(element => {
            if (element.name == tag)
                element.checked = !element.checked
        });
        return newTags
    }

    filterSelectedFamilies(selectedTags:{name:string, checked: boolean} []): InputComponent[] {
        
        let checkedTags = selectedTags.filter(function (tag:{name:string, checked: boolean}) {
            return tag.checked == true
        })
        let allComponents = this.getInputComponents()
        let selectedComponents = []
        for (let tag of checkedTags) {
            for (let component of allComponents){    
                if (component.tag.indexOf(tag.name) > -1){
                    
                    selectedComponents.push(component)
                }
            }
        }
        
        return selectedComponents
    }
}