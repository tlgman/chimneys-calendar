import {Feature} from 'ol';

export interface Zone {
  id: number;
  name?: string;
  color: string;
  features: Feature[] | object
}
