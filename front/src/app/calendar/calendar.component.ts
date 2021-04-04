import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input, Output,
  TemplateRef
} from '@angular/core';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarDateFormatter,
  CalendarEventTimesChangedEvent,
  CalendarView,
  DAYS_OF_WEEK, CalendarWeekViewComponent
} from 'angular-calendar';
import {isSameDay, isSameMonth} from 'date-fns';
// import {fr} from 'date-fns/locale'
import {Subject} from 'rxjs';
import {CustomDateFormatter} from "./custom-date-formatter.provider";

export type EventCalendarChangeState = {oldEvent: CalendarEvent, newEvent: CalendarEvent};

export type HourClickEvent = {
  date: Date;
  sourceEvent: MouseEvent;
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['calendar.component.scss'],
  templateUrl: 'calendar.component.html',
  providers: [{
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
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  // Current seleted event
  selectedEvent: CalendarEvent;
  @Input() view: CalendarView = CalendarView.Week;
  @Input() events: CalendarEvent[] = [];
  @Input('hourSegmentTemplate') hourSegment: TemplateRef<any>;
  @Input('headerWeekTemplate') headerWeek: TemplateRef<any>;
  @Output('eventChanged') eventChanged: EventEmitter<EventCalendarChangeState>
    = new EventEmitter<EventCalendarChangeState>();
  @Output('selectedEventChanged') selectedEventChanged: EventEmitter<EventCalendarChangeState>
    = new EventEmitter<EventCalendarChangeState>();
  @Output() hourSegmentClicked = new EventEmitter<HourClickEvent>();

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
  constructor(private readonly cdr: ChangeDetectorRef) {}

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

  /**
   * Change time and call handleEvent
   * @param event
   * @param newStart
   * @param newEnd
   */
  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    const newEvent = this.setEventTime({event, newStart, newEnd})
    this.handleEvent('Dropped or resized', newEvent);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // If new event is selected
    if(event !== this.selectedEvent) {
      this.selectedEventChanged.emit({
        oldEvent: this.selectedEvent,
        newEvent: event
      });
      this.selectedEvent = event;
    }
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  /**
   * Change time of an event
   * @param event
   * @param newStart
   * @param newEnd
   * @return Create event
   */
  setEventTime({
                 event,
                 newStart,
                 newEnd,
               }): CalendarEvent {
    let newEvent = event;
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        newEvent = {
          ...event,
          start: newStart,
          end: newEnd,
        };
        // If selectedEvent is modified
        if (event === this.selectedEvent) {
          this.selectedEventChanged.emit({
            oldEvent: this.selectedEvent,
            newEvent: newEvent
          });
          this.selectedEvent = newEvent;
        }
        this.eventChanged.emit({oldEvent: event, newEvent});
        return newEvent;
      }
      return iEvent;
    });
    return newEvent;
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
    this.events = this.events.filter(event => event !== eventToDelete);
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

  detectChange() {
    this.cdr.detectChanges();
  }
}
