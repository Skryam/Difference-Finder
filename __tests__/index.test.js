import path from 'node:path';
import { cwd } from 'node:process';
import { shouldBeStylish, shouldBePlain, shouldBeJSON } from '../__fixtures__/shouldBe.js';
import gendiff from '../src/index.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, '__fixtures__', file);

const jsonFilesFormat = (format) => gendiff(fileFromFixtures('deep1.json'), fileFromFixtures('deep2.json'), format);
const yamlFilesFormat = (format) => gendiff(fileFromFixtures('deep1.yaml'), fileFromFixtures('deep2.yml'), format);

describe('diff', () => {
  describe('stylish format', () => {
    it('should return diff in stylish format for json files', () => {
      expect(jsonFilesFormat('stylish')).toEqual(shouldBeStylish);
    });

    it('should return diff in stylish format for yaml files', () => {
      expect(yamlFilesFormat('stylish')).toEqual(shouldBeStylish);
    });
  });

  describe('json format', () => {
    it('should return diff in json format for json files', () => {
      expect(jsonFilesFormat('json')).toEqual(shouldBeJSON);
    });

    it('should return diff in json format for yaml files', () => {
      expect(yamlFilesFormat('json')).toEqual(shouldBeJSON);
    });
  });

  describe('plain format', () => {
    it('should return diff in plain format for json files', () => {
      expect(jsonFilesFormat('plain')).toEqual(shouldBePlain);
    });

    it('should return diff in plain format for yaml files', () => {
      expect(yamlFilesFormat('plain')).toEqual(shouldBePlain);
    });
  });
});
