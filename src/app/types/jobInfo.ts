
export class JobInfo {
    id: string;
    name: string;
    description: string;
    links: {
        self: string;
        case: string;
    };
    parent_case: {
        links: {self: string};
        name: string;
        thumbnail: string;
        description: string;
    };
    creation_datetime: string;
    start_datetime: string;
    end_datetime: string;
    status: string;
    user: string;
    families: Array<any>;
    inputs: Array<any>;
    scripts: Array<any>;
    templates: Array<any>;
    outputs: Array<any>;
    backend_identifier: string;
}

//job.parent_case = {links: {self:job['links']['case']},name: job['parent_case'],thumbnail: "string",description: "string"}