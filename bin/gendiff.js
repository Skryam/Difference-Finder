#!/usr/bin/env node
import { program } from 'commander';
import getFormat from '../src/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(getFormat(filepath1, filepath2, options));
  });

program.parse(process.argv);
