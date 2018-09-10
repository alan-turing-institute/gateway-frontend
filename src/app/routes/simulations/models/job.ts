import { Case, CaseSummary, generateMockCase } from './case';
import { Value, generateMockValue } from './value';
import { Output, generateMockOutput } from './output';

// corresponds to JSON response from middleware route GET /job/<job_id>
export interface Job {
  id: string;
  description: string;
  name: string;
  outputs: Output[];
  parent_case: Case;
  status: string;
  user: string;
  values: Value[];
}

const mockJob = {
  id: '1',
  description: 'Job description',
  name: 'Job name',
  outputs: [generateMockOutput()],
  parent_case: generateMockCase(),
  status: 'Not Started',
  user: 'simulate-user',
  values: [generateMockValue()],
};

export interface JobSummary {
  id: string;
  description: string;
  links: object;
  name: string;
  parent_case: CaseSummary;
  status: string;
  user: string;
}

export class JobPatch {
  name: string;
  description: string;
  values: Value[];

  constructor(name: string, description: string, values: Value[]) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (values.length !== 0) this.values = values;
  }
}
