import path from 'node:path';
import { cwd } from 'node:process';
import { shouldBe, shouldBePlain } from '../__fixtures__/shouldBe.js';
import getDiffObject from '../indexDiff.js';
import stylishFormat from '../formatters/stylish.js';
import plainFormat from '../formatters/plain.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, 'bin', '__fixtures__', file);

test('JSON', () => {
  expect(plainFormat(getDiffObject(fileFromFixtures('deepJSON1.json'), fileFromFixtures('deepJSON2.json')))).toEqual(shouldBePlain);
});

/*test('YAML', () => {
  expect(getDifference(fileFromFixtures('file1YAML.yaml'), fileFromFixtures('file2YAML.yml'))).toEqual(shouldBe);
})*/
