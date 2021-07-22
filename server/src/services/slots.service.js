const config = require('config');
const { isBefore, addMinutes, isAfter } = require('date-fns');

class SlotsService {
  constructor() { }

  /**
   * @param {Date} start 
   * @param {Date} end 
   * @param {number} slotSize
   * @returns {{start: Date, end: Date}[]} Slot list
   */
  sliceTimeIntervalIntoSlots(start, end, slotSize = config.get('slotSize')) {
    const slots = [];
    let currentWorkingDate = start;
    while (isBefore(currentWorkingDate, end)) {
      const slot = {
        start: currentWorkingDate,
        end: addMinutes(currentWorkingDate, slotSize)
      };
      if (!isAfter(slot.end, end)) {
        slots.push(slot);
      }
      currentWorkingDate = slot.end;
    }
    return slots;
  }
}

module.exports = SlotsService;
