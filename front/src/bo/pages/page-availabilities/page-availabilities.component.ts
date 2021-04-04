import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {Availability} from '../../models/availability.model';
import {AvailabilitiesCalendarComponent} from './availabilities-calendar/availabilities-calendar.component';
import {ZoneService} from '../zone.service';
import {Zone} from '../../models/zone.model';
import {MessageService} from 'primeng/api';

const EVENT_DEFAULT_PRIMARY_COLOR = '#FFFFFF';
const EVENT_SELECTION_PRIMARY_COLOR = '#007bff';


@Component({
  selector: 'app-page-availabilities',
  templateUrl: './page-availabilities.component.html',
  styleUrls: ['./page-availabilities.component.scss']
})
export class PageAvailabilitiesComponent {
  selectedEvent: CalendarEvent<Omit<Availability, 'start' | 'end'>>;
  selectedAvailability: Availability;
  @ViewChild('calendar', {static: true}) calendar: AvailabilitiesCalendarComponent;
  zones: Zone[] = [];

  constructor(private readonly zoneService: ZoneService,
              private readonly messageService: MessageService) {
    zoneService.fetch().subscribe((zones) => {
      this.zones = zones;
    }, err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur au chargement des zones',
        detail: 'Impossible de charger la liste des zones.'
      });
    });
  }

  createdEvent(calEvent: CalendarEvent) {
    this.selectedAvailability = PageAvailabilitiesComponent.createAvailability({
      start: calEvent.start,
      end: calEvent.end
    });
    calEvent.meta = {zoneId: this.selectedAvailability.zoneId};
    this.setSelectedEvent(calEvent);
  }

  changedAvailability() {
    const {start, end, zoneId} = this.selectedAvailability;
    this.selectedEvent.start = start;
    this.selectedEvent.end = end;
    this.selectedEvent.meta = {zoneId};
    const selectedZone = this.zones.find(zone => zone.id === zoneId);
    this.selectedEvent.color.secondary = selectedZone ? selectedZone.color : '#000000';
    this.selectedEvent.title = `Zone : ${selectedZone?.name || '??'}`;
    this.calendar.detectChangeEvents();
  }

  onEventChange(event: CalendarEvent<Omit<Availability, 'start' | 'end'>>) {
    this.selectedAvailability = {
      start: event.start,
      end: event.end,
      zoneId: event.meta?.zoneId
    };
    this.setSelectedEvent(event);
  }

  protected static createAvailability({start, end}: {start: Date, end: Date}): Availability {
    return {
      start,
      end,
      zoneId: null
    };
  }

  setSelectedEvent(event: CalendarEvent) {
    if(this.selectedEvent) {
      this.selectedEvent.color.primary = EVENT_DEFAULT_PRIMARY_COLOR;
    }
    this.selectedEvent = event;
    event.color.primary = EVENT_SELECTION_PRIMARY_COLOR;
    this.calendar.detectChangeEvents();
  }
}
