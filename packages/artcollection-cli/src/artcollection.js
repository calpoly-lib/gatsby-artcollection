#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.1')
  .command('export', 'export Art Collection')
  .command('create-pages', 'create pages for Art Collection')
  .parse(process.argv);
