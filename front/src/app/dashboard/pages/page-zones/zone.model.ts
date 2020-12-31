import {Feature} from 'ol';

export interface Zone {
  id: number;
  name?: string;
  color: string;
  features: Feature[]
}

export interface JsonableZone {
  id: number;
  name?: string;
  color: string;
  geom?: object
}
