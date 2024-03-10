#!/usr/bin/env node
import { program } from 'commander';
import getDiffObject from './indexDiff.js';
import getFormatter from './formatters/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const base = getDiffObject(filepath1, filepath2);
    const formatName = options.format || 'stylish';
    console.log(formatName)
    const formatter = getFormatter(base, formatName);
    console.log(JSON.stringify(base, null, 2));
  });

program.parse(process.argv);
