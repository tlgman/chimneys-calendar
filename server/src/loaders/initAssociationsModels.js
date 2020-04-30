const InterventionType = require('../models/InterventionType');
const Appointment = require('../models/Appointment');

InterventionType.hasMany(Appointment);
Appointment.belongsTo(InterventionType, {as: 'interventionType'});
