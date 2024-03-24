import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const getFormatter = (diffObject, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(diffObject);
    case 'plain':
      return plainFormat(diffObject);
    case 'json':
      return jsonFormat(diffObject);
    default:
      throw new Error(`Unknown format: ${formatName}`);
  }
}

export default getFormatter;