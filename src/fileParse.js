import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const sortKeys = (parsedObject) => {
  const keys = Object.keys(parsedObject);
  const sortedObject = {};
  keys.forEach((key) => {
    sortedObject[key] = parsedObject[key];
  });
  return sortedObject;
};

const fileParse = (filePath) => {
  switch (path.extname(filePath)) {
    case '.yaml':
    case '.yml':
    return sortKeys(yaml.load(readFileSync(filePath, 'utf-8')));
    case '.json':
    return sortKeys(JSON.parse(readFileSync(filePath, 'utf-8')));
    default:
    throw new Error(`Only js, json and yaml: ${path.extname(filePath)}`);
  }
};

export default fileParse;
