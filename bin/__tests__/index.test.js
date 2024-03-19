import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { shouldBeStylish, shouldBePlain, shouldBeJSON } from '../__fixtures__/shouldBe.js';
import getDiffObject from '../indexDiff.js';
import stylishFormat from '../formatters/stylish.js';
import plainFormat from '../formatters/plain.js';
import jsonFormat from '../formatters/json.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, 'bin', '__fixtures__', file);

const testFormat = (formatFunction, expectedFormat) => {
  expect(formatFunction(getDiffObject(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json')))).toEqual(expectedFormat);
  expect(formatFunction(getDiffObject(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml')))).toEqual(expectedFormat);
}

test('toFormatStylish', () => testFormat(stylishFormat, shouldBeStylish));

test('toFormatJSON', () => testFormat(jsonFormat, shouldBeJSON));

test('toFormatPlain', () => testFormat(plainFormat, shouldBePlain));
