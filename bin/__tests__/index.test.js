import path from 'node:path';
import { cwd } from 'node:process';
import shouldBe from '../__fixtures__/expectedfile.js'
import getDifference from '../getDifference.js';

const currentDirectory = cwd();
const fileFromFixtures = (file) => path.join(currentDirectory, file);

test('JSON', () => {
  console.log(fileFromFixtures('file1.json'))
  expect(getDifference(fileFromFixtures('file1.json'), fileFromFixtures('file2.json'))).toEqual(shouldBe);
});

test('YAML', () => {
  console.log(fileFromFixtures('file1YAML.yaml'))
  expect(getDifference(fileFromFixtures('file1YAML.yaml'), fileFromFixtures('file2YAML.yml'))).toEqual(shouldBe);
})
