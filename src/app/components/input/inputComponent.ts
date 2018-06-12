import { ENAMETOOLONG } from "constants";

export class InputComponent {
    name: string;
    tag: string[];
    type: string;
    label: string;
    units: string;
    type_value: string;
    min_value: string;
    max_value: string;
    step: string;
    value: string;
    options:string[];
    help: string;
    disabled: boolean;
    valid: boolean;
    prefix:string;

    constructor(name: string, 
                type: string,
                label: string,
                units: string,
                min_value: string,
                max_value: string,
                step: string,
                value: string,
                help: string,
                prefix: string) 
    {
        this.name = prefix+name;
        this.tag = [],
        this.type = "slider",
        this.label = name,
        this.units = units,
        this.type_value = "string",
        this.min_value = min_value,
        this.max_value = max_value,
        this.step=step,
        this.value = value, 
        this.options =[],
        this.help = "string help me",
        this.disabled = true,
        this.valid = true,
        this.prefix = prefix

    }
}
