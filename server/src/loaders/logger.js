const {createLogger, addColors, format, transports} = require('winston');
const { combine, timestamp, printf } = format;
const colorizer = format.colorize();

const personalizedFormat = printf(({level, message, timestamp}) => {
  return colorizer.colorize(level,`[${timestamp}] [${level}]: ${message}`);
});

addColors({
  debug: 'bold',
  http: 'blue',
  info: 'bold',
  warn: 'italic yellow',
  error: 'bold red'
});

const logger = createLogger({
  level: 'debug',
  transports: [
    new transports.Console({
      level: 'debug',
      stderrLevels: ['error'],
      format: combine(
        timestamp(),
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

module.exports = logger;
