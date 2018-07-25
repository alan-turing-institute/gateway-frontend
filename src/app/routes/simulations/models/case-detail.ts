export interface CaseDetail {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  value: string;
  fields: object[];
  scripts: object[];
}

export function generateMockCaseDetail(): CaseDetail {
  return {
    id: '1',
    name: 'Case name',
    description: 'Case description',
    thumbnail:
      'https://simulate.blob.core.windows.net/openfoam-thumbnails/damBreak.png',
    value: 'Case value',
    fields: [
      {
        name: 'test',
        specs: [
          {
            id: 3,
            value: '0.02',
            name: 'default',
          },
        ],
      },
    ],
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
