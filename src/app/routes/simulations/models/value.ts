export interface Value {
  id: string;
  name: string;
  value: string;
  parent_template: object;
}

export function generateMockValue(): Value {
  return {
    id: '10',
    name: 'Example_value',
    value: '10.3',
    parent_template: null,
  };
}
