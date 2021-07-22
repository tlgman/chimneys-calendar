import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { addDays, addWeeks, differenceInMinutes, endOfWeek, startOfDay, startOfWeek } from 'date-fns';
import { Coordinate } from 'ol/coordinate';
import { Subscription } from 'rxjs/internal/Subscription';
import { SlotsFacade } from 'src/app/facades/slots.facade';
import { Slot } from 'src/app/models/slot';
import { environment } from 'src/environments/environment';

type FormatedSlots = Map<string, Slot[]>;

const AVAILABLE_DAYS_IN_WEEK = 6;

@Component({
  selector: 'app-slots-chooser',
  templateUrl: './slots-chooser.component.html',
  styleUrls: ['./slots-chooser.component.scss']
})
export class SlotsChooserComponent implements OnChanges {
  @Input() coordinate: Coordinate;
  protected slotsMap: FormatedSlots;
  startOfCurrentWeek: Date = startOfWeek(new Date, { weekStartsOn: 1 });
  slotMatrix: (Slot | undefined)[][] = [];
  columnSize = 0;
  getSlotSubcription: Subscription;
  /**
   * Liste of days in week
   */
  daysInWeek: Date[] = [];
  loading = true;

  constructor(private slotsFacade: SlotsFacade) {
    this.generateDayInWeek();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinate']) {
      this.loadAvailableSlots();
    }
  }

  protected loadAvailableSlots() {
    if (this.getSlotSubcription) {
      // Cancel previous request
      this.getSlotSubcription.unsubscribe();
    }
    this.slotMatrix = [];
    const start = this.startOfCurrentWeek;
    const end = endOfWeek(start, { weekStartsOn: 1 });
    this.loading = true;
    this.getSlotSubcription = this.slotsFacade.getAvailableSlots(this.coordinate, start, end)
      .subscribe(slots => {
        this.loading = false;
        this.getSlotSubcription.unsubscribe();
        this.generateSlotInWeek(slots)
      });
  }

  protected generateSlotInWeek(slots: Slot[]) {
    if (!slots.length) {
      this.columnSize = 0;
      return;
    }

    this.slotsMap = new Map();
    // Start first slot of week 60 * 24
    // It will represent first start moment of slot of the day
    let firstSlotTime = 1440;
    // It will represnet last start moment of slot of the day
    let lastSlotTime = 0;
    slots.forEach(slot => {
      const day = startOfDay(slot.start);
      const stringDay = day.toDateString()
      const timeIntervalFromStartOfDay = differenceInMinutes(slot.start, day);
      if (timeIntervalFromStartOfDay < firstSlotTime) {
        firstSlotTime = timeIntervalFromStartOfDay;
      }
      if (timeIntervalFromStartOfDay > lastSlotTime) {
        lastSlotTime = timeIntervalFromStartOfDay;
      }
      if (!this.slotsMap.has(stringDay)) {
        this.slotsMap.set(stringDay, [slot]);
      } else {
        this.slotsMap.set(stringDay, [...this.slotsMap.get(stringDay), slot]);
      }
    });
    console.log(this.slotsMap);
    console.log(firstSlotTime);
    console.log(lastSlotTime);
    this.createSlotsMatrix(firstSlotTime, lastSlotTime);
    console.log(this.slotMatrix);
  }

  /**
   * Generate table header days
   */
  protected generateDayInWeek() {
    this.daysInWeek = new Array(AVAILABLE_DAYS_IN_WEEK);
    for (let i = 0; i < AVAILABLE_DAYS_IN_WEEK; ++i) {
      this.daysInWeek[i] = addDays(this.startOfCurrentWeek, i);
    }
  }


  protected createSlotsMatrix(firstSlotTime: number, lastSlotTime: number) {
    const days = this.daysInWeek;
    this.slotMatrix = new Array(AVAILABLE_DAYS_IN_WEEK);
    // +1 to count the last slot size
    // Because lastSlotTime is based on slot.start not on slot.end
    this.columnSize = (lastSlotTime - firstSlotTime) / environment.slotSize + 1;
    console.log(this.columnSize);
    days.forEach((day, i) => {
      const slots = this.slotsMap.get(day.toDateString());
      const column = new Array(this.columnSize);
      this.slotMatrix[i] = column;
      if (!slots) {
        return;
      }
      slots.forEach(slot => {
        const timeIntervalFromStartOfDay = differenceInMinutes(slot.start, day);
        // environment.slotSize : Number of minutes that for a rdv
        const positionInColumn = (timeIntervalFromStartOfDay - firstSlotTime) / environment.slotSize;
        column[positionInColumn] = slot;
      });
    })

    console.log('matrix: ', this.slotMatrix);
  }

  previousWeek() {
    this.startOfCurrentWeek = addWeeks(this.startOfCurrentWeek, -1);
    this.generateDayInWeek();
    this.loadAvailableSlots();
  }

  nextWeek() {
    this.startOfCurrentWeek = addWeeks(this.startOfCurrentWeek, 1);
    this.generateDayInWeek();
    this.loadAvailableSlots();
  }


  ngOnDestroy() {
    this.getSlotSubcription && this.getSlotSubcription.unsubscribe();
  }

}
