const morgan = require('morgan');
const logger = require('./logger')();

// log format
// const format = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent';
const format = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms - :referrer" ":user-agent';
// set format and link morgan stream to logger stream
const morganLogger = morgan(format, {stream: logger.stream });
module.exports = morganLogger;
