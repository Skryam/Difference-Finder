import { readFileSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const sortKeys = (parsedObject) => {
  const keys = Object.keys(parsedObject);
  const sortedKeys = keys.sort();
   const sortedObject = {};
   sortedKeys.forEach((key) => {
     sortedObject[key] = parsedObject[key];
  });
   return sortedObject;
}

const fileParse = (filePath) => {
  if (path.extname(filePath) === '.yaml' || '.yml') {
    return sortKeys(yaml.load(readFileSync(filePath, 'utf-8')))
  }
  return sortKeys(JSON.parse(readFileSync(filePath, 'utf-8')));
  };

  export default fileParse;