const chalk = require('chalk');
const moment = require('moment');

module.exports.log = (content, type = 'log') => {
    const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
    switch (type) {
        case 'log': {
            const logContent = `${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `;
            return console.log(logContent);
        }
        case 'warn': {
            const logContent = `${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `;
            return console.log(logContent);
        }
        case 'error': {
            const logContent = `${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `;
            return console.log(logContent);
        }
        case 'debug': {
            const logContent = `${timestamp} ${chalk.green(type.toUpperCase())} ${content} `;
            return console.log(logContent);
        }
        case 'cmd': {
            const logContent = `${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`;
            return console.log(logContent);
        }
        case 'ready': {
            const logContent = `${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`;
            return console.log(logContent);
        }
        default: throw new TypeError('Log type must be either warn, debug, log, ready, cmd or error.');
    }
};

module.exports.error = (...args) => this.log(...args, 'error');

module.exports.warn = (...args) => this.log(...args, 'warn');

module.exports.debug = (...args) => this.log(...args, 'debug');

module.exports.cmd = (...args) => this.log(...args, 'cmd');

module.exports.ready = (...args) => this.log(...args, 'ready');