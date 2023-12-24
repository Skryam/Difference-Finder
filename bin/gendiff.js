#!/usr/bin/env node
import { program } from 'commander';
import getDifference from './parsPath.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(getDifference(filepath1, filepath2));
  });

program.parse(process.argv);
