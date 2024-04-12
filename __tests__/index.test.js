import path from 'node:path';
import { cwd } from 'node:process';
import { shouldBeStylish, shouldBePlain, shouldBeJSON } from '../__fixtures__/shouldBe.js';
import getDiffObject from '../src/indexDiff.js';
import getFormatter from '../src/formatters/index.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, '__fixtures__', file);

const testFormat = (formatName, expectedFormat) => {
  expect(getFormatter(getDiffObject(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json')), formatName)).toEqual(expectedFormat);
  expect(getFormatter(getDiffObject(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml')), formatName)).toEqual(expectedFormat);
};

test('toFormatStylish', () => testFormat('stylish', shouldBeStylish));

//test('toFormatJSON', () => testFormat('json', shouldBeJSON));

test('toFormatPlain', () => testFormat('plain', shouldBePlain));
