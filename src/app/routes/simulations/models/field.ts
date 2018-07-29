export interface Field {
  id: string;
  name: string;
  specs: string[];
  fields: string[];
}

export function generateMockField(): Field {
  return {
    id: '700',
    name: 'water',
    specs: ['1', '2'],
    fields: ['58', '59'],
  };
}
