import path from 'node:path';
import { cwd } from 'node:process';
import { shouldBeStylish, shouldBePlain, shouldBeJSON } from '../__fixtures__/shouldBe.js';
import gendiff from '../src/index.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, '__fixtures__', file);

const jsonFilesFormat = (format) => gendiff(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json'), format);
const yamlFilesFormat = (format) => gendiff(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml'), format);

describe('diff', () => {
  const formats = [
    { formatCase: 'stylish', shouldBe: shouldBeStylish },
    { formatCase: 'plain', shouldBe: shouldBePlain },
    { formatCase: 'json', shouldBe: shouldBeJSON },
  ];

  it.each(formats)('should return diff in %s format for json files', (format) => {
    expect(jsonFilesFormat(format.formatCase)).toEqual(format.shouldBe);
  });

  it.each(formats)('should return diff in %s format for yaml files', (format) => {
    expect(yamlFilesFormat(format.formatCase)).toEqual(format.shouldBe);
  });
});
