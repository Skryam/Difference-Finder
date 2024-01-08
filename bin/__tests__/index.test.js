import path from 'node:path';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import shouldBe from '../__fixtures__/expectedfile.js'
import getDifference from '../parsPath.js';

const currentDirectory = cwd();
const fixturesDirectory = (file) => path.join(currentDirectory, 'bin', '__fixtures__', file);

test('getDifference', () => {
  expect(getDifference(fixturesDirectory('file1.json'), fixturesDirectory('file2.json'))).toEqual(shouldBe);
});
