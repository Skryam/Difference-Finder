#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-h, --help', 'output usage information');

  program.parse(process.argv);

if (program.opts().version) {
  console.log('0.1.0');
}

if (program.opts().help) {
  console.log(program.helpInformation());
}