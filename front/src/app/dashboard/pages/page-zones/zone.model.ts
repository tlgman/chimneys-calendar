import {Feature} from 'ol';
import {GeoJSONGeometry} from "ol/format/GeoJSON";

export interface Zone {
  id: number;
  name?: string;
  color: string;
  features: Feature[]
}

export interface ZoneJsonable {
  id: number;
  name?: string;
  color: string;
  geom?: object
}
