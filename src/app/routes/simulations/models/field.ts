import { Spec, generateMockSpec } from './spec';

export interface Field {
  id: string;
  name: string;
  specs: Spec[];
  fields: Field[];
}

export function generateMockField(): Field {
  return {
    id: '700',
    name: 'water',
    specs: [generateMockSpec()],
    fields: [generateMockField()],
  };
}
