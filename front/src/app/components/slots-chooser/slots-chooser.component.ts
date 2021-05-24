import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { addDays, differenceInMinutes, startOfDay, startOfWeek } from 'date-fns';
import { Coordinate } from 'ol/coordinate';
import { timeInterval } from 'rxjs/operators';
import { SlotsFacade } from 'src/app/facades/slots.facade';
import { Slot } from 'src/app/models/slot';
import { environment } from 'src/environments/environment';

type FormatedSlots = Map<string, Slot[]>;

@Component({
  selector: 'app-slots-chooser',
  templateUrl: './slots-chooser.component.html',
  styleUrls: ['./slots-chooser.component.scss']
})
export class SlotsChooserComponent implements OnChanges {
  @Input() coordinate: Coordinate;
  protected slotsMap: FormatedSlots;
  slotMatrix: (Slot | undefined)[][];
  columnSize = 0;

  constructor(private slotsFacade: SlotsFacade) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['coordinate']) {
      this.loadAvailableSlots();
    }
  }

  protected loadAvailableSlots() {
    this.slotsFacade.getAvailableSlots(this.coordinate)
      .subscribe(this.formatSlots.bind(this));
  }

  protected formatSlots(slots: Slot[]) {
    this.slotsMap = new Map();
    // Start first slot of week 60 * 24
    let firstSlotTime = 1440;
    let lastSlotTime = 0;
    slots.forEach(slot => {
      const day = startOfDay(slot.start);
      const stringDay = day.toDateString()
      const timeIntervalFromStartOfDay = differenceInMinutes(slot.start, day);
      if(timeIntervalFromStartOfDay < firstSlotTime) {
        firstSlotTime = timeIntervalFromStartOfDay;
      }
      if(timeIntervalFromStartOfDay > lastSlotTime) {
        lastSlotTime = timeIntervalFromStartOfDay;
      }
      if(!this.slotsMap.has(stringDay)) {
        this.slotsMap.set(stringDay, [slot]);
      } else {
        this.slotsMap.set(stringDay, [...this.slotsMap.get(stringDay), slot]);
      }
    });
    console.log(this.slotsMap);
    console.log(firstSlotTime);
    console.log(lastSlotTime);
    this.createSlotsMatrix(firstSlotTime, lastSlotTime);
  }


  protected createSlotsMatrix(firstSlotTime: number, lastSlotTime: number) {
    const days = this.getAllDayConcerned();
    this.slotMatrix = new Array(7);
    // +1 to count the last slot size 
    // Because lastSlotTime is based on slot.start not on slot.end
    this.columnSize = (lastSlotTime - firstSlotTime) / environment.slotSize + 1;
    days.forEach((day, i) => {
      const slots = this.slotsMap.get(day.toDateString());
      const column = new Array(this.columnSize);
      this.slotMatrix[i] = column;
      if(!slots) {
        return;
      }
      slots.forEach(slot => {
        const timeIntervalFromStartOfDay = differenceInMinutes(slot.start, day);
        const positionInColumn = (timeIntervalFromStartOfDay - firstSlotTime) / environment.slotSize;
        column[positionInColumn] = slot;
      });
    })

    console.log('matrix: ', this.slotMatrix);
  }

  /**
   * Get only concerned days
   * @returns 
   */
  protected getAllDayConcerned(): Date[] {
    // TODO !!! Changer la date
    const days = new Array<Date>(7);
    let currentDay = startOfWeek(new Date(2021, 3, 26), {weekStartsOn: 1});
    for(let i = 0; i < 7; ++i) {
      days[i] = currentDay;
      currentDay = addDays(currentDay, 1);
    }
    return days;
  }
}
