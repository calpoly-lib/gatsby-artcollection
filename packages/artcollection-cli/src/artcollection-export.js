#!/usr/bin/env node

const program = require('commander');
const exportToJson= require("./export-to-json");

program.action(function () {
  exportToJson();
});

program.parse(process.argv);
