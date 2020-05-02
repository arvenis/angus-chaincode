import * as winston from 'winston';

export namespace Logger {
  let _logger : winston.Logger;
  
  export function createInstance(level: string) {
    _logger = winston.createLogger({
      level: level.toLowerCase(),
      transports: [new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.padLevels(),
          winston.format.printf((info) => {
            const {timestamp, level, message} = info;
            const str = `[angus:]`;
            return `${timestamp} ${level} ${str} ${message} `;
            })
        )
      })],
    })
  }
  
  export function suppressMessages() {
    _logger.silent=true;
  }
  export function debug(msg: string) {
    _logger.debug(msg);
  }
  export function error(msg: string) {
    _logger.error(msg);
  }
  export function warn(msg: string) {
    _logger.warn(msg);
  }
  export function info(msg: string) {
    _logger.info(msg);
  }

  export function getLogger(): winston.Logger {
    return _logger;
  }
}