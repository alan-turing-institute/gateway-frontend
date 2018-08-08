export interface Value {
  name: string;
  value: string;
}

export function generateMockValue(): Value {
  return {
    name: 'Example_value',
    value: '10.3',
  };
}
