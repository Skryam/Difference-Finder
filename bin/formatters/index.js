import stylishFormat from './stylish.js';

const getFormatter = (diffObject, formatName) => {
  if (formatName === 'stylish') {
    return stylishFormat(diffObject);
  }
}

export default getFormatter;