export interface Spec {
  id: string;
  name: string;
  value: string;
}

export function generateMockSpec(): Spec {
  return { id: '10', name: 'max', value: '1' };
}
