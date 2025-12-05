import { createLogger, format, transports, Logger } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf((info) => {
  return `${info.timestamp} [${info.level.toUpperCase()}]: ${String(info.message)}`;
});

export const logger: Logger = createLogger({
  level: 'info',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console()
  ]
});
