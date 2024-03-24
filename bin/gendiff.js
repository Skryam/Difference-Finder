#!/usr/bin/env node
import { program } from 'commander';
import getDiffObject from '../src/indexDiff.js';
import getFormatter from '../src/formatters/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const base = getDiffObject(filepath1, filepath2);
    const formatName = options.format || 'stylish';
    const formatter = getFormatter(base, formatName);
    console.log(formatter);
  });

program.parse(process.argv);
