const {createLogger, addColors, format, transports} = require('winston');
const config = require('config');
const { combine, timestamp, printf, splat, label } = format;
const colorizer = format.colorize();

const personalizedFormat = printf(({level, message, timestamp, label}) => {
  const displayedLabel = label ? `[${label}]` : '';
  return colorizer.colorize(level,`[${timestamp}] [${level}] ${displayedLabel} : ${message}`);
});

addColors({
  debug: 'bold',
  http: 'italic blue',
  database: 'blue',
  info: 'bold',
  warn: 'italic yellow',
  error: 'bold red'
});

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  database: 4,
  debug: 5
};

const getLabel = (callingModule) => {
  if(!callingModule || !callingModule.filename) {
    return;
  }
  return callingModule.filename.split('/').pop();
};

module.exports = (callingModule) => {
  const logger = createLogger({
    level: config.get('logger.level'),
    levels: levels,
    transports: [
      new transports.Console({
        level: config.get('logger.level'),
        stderrLevels: ['error'],
        format: combine(
          timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
          splat(),
          label({label: getLabel(callingModule)}),
          personalizedFormat
        )
      })
    ]
  });

  // To expose logger stream
  // Used by morgan in this app
  logger.stream = {
    write: function(message, encoding){
      logger.http(message);
    }
  };
  return logger;
};
