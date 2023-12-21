#!/usr/bin/env node
import { program } from 'commander';
import path from 'node:path';
import fileParse from './parsPath.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(fileParse(filepath1), fileParse(filepath2));
  });

program.parse(process.argv);