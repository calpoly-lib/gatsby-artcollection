#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .command('export', 'export Art Collection')
  .command('reindex', 'reindex Art Collection')
  .parse(process.argv);
