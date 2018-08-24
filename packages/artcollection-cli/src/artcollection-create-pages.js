#!/usr/bin/env node

const program = require('commander');
const createPages = require("./create-pages");

program.action(function () {
  createPages();
});

program.parse(process.argv);
