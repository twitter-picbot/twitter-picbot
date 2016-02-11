'use strict';

const log = require('loglevel');
const prefixer = require('loglevel-message-prefix');

prefixer(log, {
  prefixes: ['timestamp', 'level'],
  separator: ' '
});

log.setLevel('info');

module.exports = log;
