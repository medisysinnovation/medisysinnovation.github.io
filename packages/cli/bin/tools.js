#!/usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));

function debug(...args) {
  if (!argv.debug) return;
  console.log(...args);
}
debug('123213');
require('../lib/cli/index.js');
