export interface SearchedAddress {
  geometry: {
    coordinates: [number, number];
  },
  properties: {
    label: string;
    score: number;
  }
}
