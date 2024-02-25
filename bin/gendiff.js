#!/usr/bin/env node
import { program } from 'commander';
import getDiffObject from './indexDiff.js';
import getFormatter from './formatters/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
    program.action((filepath1, filepath2) => {
      //const format = options.format || 'stylish';
      const base = getDiffObject(filepath1, filepath2);
      //getFormatter(base, format);
console.log(base)
  });

program.parse(process.argv);
