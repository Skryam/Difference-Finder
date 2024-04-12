import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const fileParse = (filePath) => {
  switch (path.extname(filePath)) {
    case '.yaml':
    case '.yml':
      return (yaml.load(readFileSync(filePath, 'utf-8')));
    case '.json':
      return (JSON.parse(readFileSync(filePath, 'utf-8')));
    default:
      throw new Error(`Read Only json and yaml, Provided: ${path.extname(filePath)}`);
  }
};

export default fileParse;
