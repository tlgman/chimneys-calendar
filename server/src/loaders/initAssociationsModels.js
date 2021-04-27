const InterventionType = require('../models/InterventionType');
const Appointment = require('../models/Appointment');
const Availability = require('../models/Availabilitiy');
const Zone = require('../models/Zone');

InterventionType.hasMany(Appointment);
Appointment.belongsTo(InterventionType, {as: 'interventionType'});

Availability.belongsTo(Zone, {as: 'zone'});
