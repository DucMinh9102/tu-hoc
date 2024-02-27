const winston = require('winston');
const { createLogger, transports, format } = winston;

const logger = createLogger({
  level: 'silly', // Cấp độ log
  format: format.combine(
    format.timestamp(),
    format.json() // Định dạng log JSON
  ),
  transports: [
    new transports.Console(), // Log ra console
    new transports.File({ filename: './logs/log_file.log' }) // Log ra file
  ]
});

module.exports.log = {
    custom: logger,
  };