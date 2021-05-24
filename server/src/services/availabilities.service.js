const Sequelize = require('sequelize');
const Availability = require('../models/Availability');
const Zone = require('../models/Zone');
const logger = require('../loaders/logger')(module);
const {addMinutes} = require('date-fns');
const SlotsService = require('./slots.service');

class AvailabilitiesService {

  constructor() {
    this.slotsService = new SlotsService();
  }

  /**
   * Get all available slots for specifs zones
   * @param {number} lon 
   * @param {number} lat 
   * @returns 
   */
  async getAvailableSlots(lon, lat) {
    const results = await Availability.findAll({
      attributes: ['start', 'end'],
      where: Sequelize.where(
        Sequelize.fn('ST_Contains', 
        Sequelize.col('zone.geom'), 
        Sequelize.fn('ST_SetSRID',
            Sequelize.fn('ST_POINT', lon, lat),
            4326
          )
        )
      , true),
      include: {model: Zone, as: 'zone', required: true}
    });

    logger.debug('%d availabilities founds', results.length);
    
    const slots = results.flatMap(availability => 
      this.slotsService.sliceTimeIntervalIntoSlots(availability.start, availability.end)
    );

    logger.debug('%d slots found', slots.length);

    return slots;
  }
}

module.exports = AvailabilitiesService;