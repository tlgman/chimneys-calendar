import { Availability } from '../models/availability.model';

export function createAvailability({start, end}: {start: Date, end: Date}): Availability {
  return {
    start,
    end,
    zoneId: null
  };
}