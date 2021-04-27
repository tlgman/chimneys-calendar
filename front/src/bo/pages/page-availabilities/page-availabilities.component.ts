import { Component, ViewChild } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { endOfWeek, isAfter, isBefore, startOfWeek } from 'date-fns';
import { MessageService } from 'primeng/api';
import { combineLatest } from 'rxjs';
import { AvailabilitiesFacade } from 'src/bo/facades/availabilities.facade';
import { createAvailability } from 'src/bo/utils/availabilites.utils';
import { filterEventsByDate } from 'src/bo/utils/calendar-event.utils';
import { Availability } from '../../models/availability.model';
import { Zone } from '../../models/zone.model';
import { ZoneService } from '../zone.service';
import { AvailabilitiesCalendarComponent } from './availabilities-calendar/availabilities-calendar.component';

const EVENT_DEFAULT_PRIMARY_COLOR = '#FFFFFF';
const EVENT_SELECTION_PRIMARY_COLOR = '#007bff';
const CLASS_ICON_SPINNER = 'pi pi-spin pi-spinner';
const CLASS_ICON_CHECK = 'pi pi-check';


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
  saveButtonIcon: string = CLASS_ICON_CHECK;

  constructor(private readonly zoneService: ZoneService,
              private readonly messageService: MessageService,
              private readonly availabilitiesFacade: AvailabilitiesFacade) {

    combineLatest([
      zoneService.fetch(),
      this.availabilitiesFacade.getAll$()
    ])
    .subscribe(([zones, availabilities]) => {
      console.log('zone', zones);
      console.log('availabilities', availabilities);
      this.zones = zones;
      this.calendar.initEventsFromAvailabilities(availabilities, zones);
    }, err => {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur des disponibilités',
        detail: 'Impossible de charger la liste des zones.'
      });
    })
  }

  createdEvent(calEvent: CalendarEvent) {
    this.selectedAvailability = createAvailability({
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

  setSelectedEvent(event: CalendarEvent) {
    if(this.selectedEvent) {
      this.selectedEvent.color.primary = EVENT_DEFAULT_PRIMARY_COLOR;
    }
    this.selectedEvent = event;
    event.color.primary = EVENT_SELECTION_PRIMARY_COLOR;
    this.calendar.detectChangeEvents();
  }

  /**
   * Save all availabilities created and updated for all the week
   */
  saveWeek() {
    const events = this.calendar.events;
    const viewDate = this.calendar.getViewDate();
    const startWeek = startOfWeek(viewDate);
    const endWeek = endOfWeek(viewDate);

    const availabilities = events
    .filter(({start, end}) => isAfter(start, startWeek) && isBefore(end, endWeek))
    .map<Availability>((event) => (
      {
        start: event.start,
        end: event.end,
        zoneId: event.meta?.zoneId
      }
    ));
    this.saveButtonIcon = CLASS_ICON_SPINNER;
    this.availabilitiesFacade.updateOrCreateWeek$(availabilities, startWeek, endWeek).subscribe(() => {
      this.saveButtonIcon = CLASS_ICON_CHECK;
      this.messageService.add({
        severity: 'success',
        summary: 'Semaine sauvgardée'
      });
    }, err => {
      this.saveButtonIcon = CLASS_ICON_CHECK;
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de sauvegarde',
        detail: 'Impossible de sauvegarder la semaine.'
      });
      console.error(err);
    });
  }
}
