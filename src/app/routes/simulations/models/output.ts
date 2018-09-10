export interface Output {
  label: string;
  type: string;
  name: string;
  destination: string;
  filename: string;
}

export function generateMockOutput(): Output {
  return {
    label: 'Metrics (json)',
    type: 'metrics',
    name: 'metrics',
    filename: 'metrics.json',
    destination:
      'https://simulate.blob.core.windows.net/openfoam-test-output/aa99a861-3890-45ad-a9fd-b81deec9d097/metrics.json',
  };
}
