import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const getFormatter = (diffObject, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(diffObject);
    case 'plain':
      return plainFormat(diffObject);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
}

export default getFormatter;