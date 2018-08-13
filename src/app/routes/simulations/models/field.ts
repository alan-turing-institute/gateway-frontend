import { Spec, generateMockSpec } from './spec';

export interface Field {
  id: string;
  name: string;
  component: string;
  specs: Spec[];
  child_fields: Field[];
}

export function generateMockField(): Field {
  return {
    id: '700',
    name: 'water',
    component: 'slider',
    specs: [generateMockSpec()],
    child_fields: [generateMockField()],
  };
}
