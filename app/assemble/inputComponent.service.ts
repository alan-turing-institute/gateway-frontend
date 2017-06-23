import { Injectable } from '@angular/core';
import {InputComponent} from './inputComponent';
import {INPUT_COMPONENTS} from './inputComponents';


@Injectable()
export class InputComponentService {
    
    getInputComponents(): InputComponent[] {
        return INPUT_COMPONENTS;
    }

    getInputTags(): string[] {
        var tags = [];
        for (var e = 0; e < INPUT_COMPONENTS.length; e++) {
            // console.log(INPUT_COMPONENTS[e].tag)
            tags = tags.concat(INPUT_COMPONENTS[e].tag) 
        }
        var unique = tags.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
        // console.log(tags)
        return unique
    }
}