const { fn, col, Op } = require('sequelize');
const Availability = require('../models/Availability');
const Zone = require('../models/Zone');
const logger = require('../loaders/logger')(module);
const SlotsService = require('./slots.service');

class AvailabilitiesService {

  constructor() {
    this.slotsService = new SlotsService();
  }

  /**
   * Get all available slots for specifs zones
   * @param {number} lon
   * @param {number} lat
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns
   */
  async getAvailableSlots(lon, lat, startDate, endDate) {
    const results = await Availability.findAll({
      attributes: ['start', 'end'],
      where: {
        [Op.and]: [
          fn('ST_Contains',
            col('zone.geom'),
            fn('ST_SetSRID',
              fn('ST_POINT', lon, lat),
              4326
            )
          ),
          {
            start: {
              [Op.between]: [startDate, endDate]
            }
          }
        ]
      },
      include: { model: Zone, as: 'zone', required: true }
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
