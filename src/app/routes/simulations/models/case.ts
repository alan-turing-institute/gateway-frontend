import { Spec, generateMockSpec } from './spec';
import { Field, generateMockField } from './field';

export interface ApiCase {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  value: string;
  fields: object[];
  scripts: object[];
}

export function generateMockApiCase(): ApiCase {
  return {
    id: '1',
    name: 'Case name',
    description: 'Case description',
    thumbnail:
      'https://simulate.blob.core.windows.net/openfoam-thumbnails/damBreak.png',
    value: 'Case value',
    fields: [generateMockField()],
    scripts: [
      {
        action: '',
        destination: 'Allrun',
        source:
          'https://simulate.blob.core.windows.net/openfoam-test-cases/damBreak/Allrun',
      },
    ],
  };
}

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

export interface NormalizerEntities {
  cases: { [key: string]: Case };
  fields: { [key: string]: Field };
  specs: { [key: string]: Spec };
}
export interface NormalizerOutput {
  result: number | string;
  entities: NormalizerEntities;
}

export function generateMockNormalizerOutput(): NormalizerOutput {
  return {
    result: '1',
    entities: {
      cases: { '1': generateMockCase() },
      fields: {
        '700': {
          id: '700',
          name: 'water',
          specs: ['1', '2'],
          fields: ['58', '59'],
        },
      },
      specs: { '1': generateMockSpec() },
    },
  };
}

export interface NormalizedCase {
  case: Case;
  fields: Field[];
  specs: Spec[];
}

export function generateMock(): NormalizedCase {
  return {
    case: generateMockCase(),
    fields: [generateMockField()],
    specs: [generateMockSpec()],
  };
}

export interface CaseSummary {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  links: object;
  value: string;
}

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
