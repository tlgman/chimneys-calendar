import { CalendarEvent } from 'calendar-utils';
import {isAfter, isBefore} from 'date-fns';

export function filterEventsByDate(events: CalendarEvent[], start: Date, end: Date) {
  return events.filter(event => !isBefore(event.start, start) && !isAfter(event.end, end))
};