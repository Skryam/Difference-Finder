import path from 'node:path';
import { cwd } from 'node:process';
import { shouldBeStylish, shouldBePlain, shouldBeJSON } from '../__fixtures__/shouldBe.js';
import buildDiff from '../src/buildDiff.js';
import getFormat from '../src/formatters/index.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, 'bin', '__fixtures__', file);

describe('diff', () => {
  describe('stylish format', () => {
    it('should return diff in stylish format for json files', () => {
      expect(stylishFormat(getDiffObject(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json')))).toEqual(shouldBeStylish);
    });

    it('should return diff in stylish format for yaml files', () => {
      expect(stylishFormat(getDiffObject(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml')))).toEqual(shouldBeStylish);
    });
  });

  describe('json format', () => {
    it('should return diff in json format for json files', () => {
      expect(jsonFormat(getDiffObject(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json')))).toEqual(shouldBeJSON);
    });

    it('should return diff in json format for yaml files', () => {
      expect(jsonFormat(getDiffObject(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml')))).toEqual(shouldBeJSON);
    });
  });

  describe('plain format', () => {
    it('should return diff in plain format for json files', () => {
      expect(plainFormat(getDiffObject(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json')))).toEqual(shouldBePlain);
    });

    it('should return diff in plain format for yaml files', () => {
      expect(plainFormat(getDiffObject(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml')))).toEqual(shouldBePlain);
    });
  });
});
