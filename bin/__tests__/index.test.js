import path from 'node:path';
import { cwd } from 'node:process';
import shouldBe from '../__fixtures__/expectedfile';
import getDiffObject from '../indexDiff.js';
import stylishFormat from '../formatters/stylish.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, 'bin', '__fixtures__', file);

test('JSON', () => {
  expect(stylishFormat(getDiffObject(fileFromFixtures('deepJSON1.json'), fileFromFixtures('deepJSON2.json')))).toEqual(shouldBe);
});

/*test('YAML', () => {
  expect(getDifference(fileFromFixtures('file1YAML.yaml'), fileFromFixtures('file2YAML.yml'))).toEqual(shouldBe);
})*/
