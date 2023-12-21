import { readFileSync } from 'node:fs';
import path from 'node:path';

const fileParse = (filePath) => {
  if ((path.extname(filePath)) === '.json') {
    return JSON.parse(readFileSync(filePath));
  }
}

export default fileParse