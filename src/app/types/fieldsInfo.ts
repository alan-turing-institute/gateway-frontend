export class FieldTemplate {
    property_name: string;
    parameterspec_id: string;
    property_value: string;
}

export class FieldsTemplate {
    specs: Array<any>;
    name: string;
    child_fields: {
        specs: Array<FieldTemplate>;
    };
}
