#!/usr/bin/env node

const program = require('commander');
const reindex = require("./reindex");

program.action(function () {
  reindex();
});

program.parse(process.argv);
