
export interface Availability {
  id?: number;
  start: Date;
  end: Date;
  zoneId: number;
}

export interface JsonAvailability {
  id: number;
  start: string;
  end: string;
  zoneId: number;
}