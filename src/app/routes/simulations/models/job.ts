import { Case, CaseSummary, generateMockCase } from './case';
import { Value, generateMockValue } from './value';

// corresponds to JSON response from middleware route GET /job/<job_id>
export interface Job {
  id: string;
  description: string;
  name: string;
  outputs: object[];
  parent_case: Case;
  status: string;
  user: string;
  values: Value[];
}

const mockJob = {
  id: '1',
  description: 'Job description',
  name: 'Job name',
  outputs: [],
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
