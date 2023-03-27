import _ from 'lodash';
import * as winston from 'winston';

export namespace Logger {
    let _logger: winston.Logger;
    let _method: string;

    export function createInstance(level: string) {
        _logger = winston.createLogger({
            level: level.toLowerCase(),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.colorize(),
                        winston.format.simple(),
                        winston.format.padLevels(),
                        winston.format.metadata({
                            fillExcept: ['message', 'level', 'timestamp', 'label'],
                        }),
                        winston.format.printf(info => {
                            const { timestamp, level, label, message, metadata, splat, ...meta } = info;
                            let source = '[angus]';
                            if (!_.isEmpty(_method)) {
                                source += ` ${_method}:`;
                                _method = undefined;
                            }
                            let msg = `${timestamp} ${level} ${source} ${message}`;

                            if (!_.isEmpty(metadata)) {
                                msg += ` ${JSON.stringify(metadata)}`;
                            }
                            return msg;
                        })
                    ),
                }),
            ],
        });
    }

    export function suppressMessages() {
        _logger.silent = true;
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

    export function getLogger(method: string): winston.Logger {
        _method = method; // Not so nice but it works
        return _logger;
    }
}
