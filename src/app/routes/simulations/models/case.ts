import { Spec, generateMockSpec } from './spec';
import { Field, generateMockField } from './field';

// corresponds to JSON response from middleware route GET /case/id
export interface Case {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  value: string;
  fields: string[];
  scripts: object[];
}

const mockCase = {
  id: '1',
  name: 'Case name',
  description: 'Case description',
  thumbnail:
    'https://simulate.blob.core.windows.net/openfoam-thumbnails/damBreak.png',
  value: 'Case value',
  fields: ['10', '20'],
  scripts: [
    {
      action: '',
      destination: 'Allrun',
      source:
        'https://simulate.blob.core.windows.net/openfoam-test-cases/damBreak/Allrun',
    },
  ],
};

export function generateMockCase(): Case {
  return mockCase;
}

export interface CaseSummary {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  links: object;
  value: string;
}

// corresponds to JSON response from middleware route GET /case
export function generateMockCaseSummary(): CaseSummary {
  return {
    id: '1',
    name: 'Case name',
    description: 'Case description',
    thumbnail:
      'https://simulate.blob.core.windows.net/openfoam-thumbnails/damBreak.png',
    links: { self: '/case/1' },
    value: 'Case value',
  };
}

// corresponds to JSON body for route POST /case
export class CaseSelection {
  author: string;
  name: string;
  case_id: string;
}

export function generateMockCaseSelection(): CaseSelection {
  return {
    author: 'simulate-user',
    name: 'Example job name',
    case_id: '3',
  };
}
