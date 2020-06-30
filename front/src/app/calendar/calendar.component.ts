import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input, Output,
  TemplateRef,
  ViewChild, ViewChildren,
} from '@angular/core';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarDateFormatter,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK, CalendarWeekViewComponent
} from 'angular-calendar';
import {addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays} from 'date-fns';
// import {fr} from 'date-fns/locale'
import {Subject} from 'rxjs';
import {CustomDateFormatter} from "./custom-date-formatter.provider";

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.scss'],
  templateUrl: 'calendar.component.html',
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter,
    },
  ]
})

export class CalendarComponent {
  // @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  locale: string = 'fr';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  excludeDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  @Input('events') events: CalendarEvent[] = [];
  @Input('headerWeekTemplate') headerWeek: TemplateRef<any>;
  @Output('eventChanged') eventChanged: EventEmitter<{oldEvent: CalendarEvent, newEvent: CalendarEvent}>
    = new EventEmitter<{oldEvent: CalendarEvent, newEvent: CalendarEvent}>();

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  actions: {[key: string]: CalendarEventAction}= {
    edit: {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    delete: {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  };

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  // constructor(private modal: NgbModal) {}
  constructor(private cdr: ChangeDetectorRef) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        const newEvent = {
          ...event,
          start: newStart,
          end: newEnd,
        };
        this.eventChanged.emit({oldEvent: event, newEvent});
        return newEvent;
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(event: CalendarEvent): CalendarEvent {
    this.events = [
      ...this.events,
      event
    ];
    this.cdr.detectChanges();
    return event;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.cdr.detectChanges();
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  changeDate(date: Date) {
    this.viewDate = date;
    this.cdr.detectChanges();
  }

  changeView(view: CalendarView) {
    this.view = view;
    this.cdr.detectChanges();
  }

  changeEventColor(event: CalendarEvent, color: {primary: string, secondary: string}) {
    event.color = color;
    this.cdr.detectChanges();
  }
}
