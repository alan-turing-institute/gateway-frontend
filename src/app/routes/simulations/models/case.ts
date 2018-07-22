export interface Case {
  id: string;
  description: string;
  thumbnail: string;
}

export function generateMockCase(): Case {
  return {
    id: '1',
    description: 'A long description',
    thumbnail: 'https://simulate.blob.core.windows.net/openfoam-thumbnails/damBreak.png'
  };
}
