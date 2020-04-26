const {createLogger, addColors, format, transports} = require('winston');
const config = require('config');
const { combine, timestamp, printf, splat } = format;
const colorizer = format.colorize();

const personalizedFormat = printf(({level, message, timestamp}) => {
  return colorizer.colorize(level,`[${timestamp}] [${level}]: ${message}`);
});

addColors({
  debug: 'bold',
  http: 'blue',
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


const logger = createLogger({
  level: config.get('logger.level'),
  levels: levels,
  transports: [
    new transports.Console({
      level: config.get('logger.level'),
      stderrLevels: ['error'],
      format: combine(
        timestamp(),
        splat(),
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
