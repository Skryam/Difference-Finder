import buildDiff from './buildDiff.js';
import getFormat from './formatters/index.js';

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const base = buildDiff(filepath1, filepath2);
  const formatter = getFormat(base, format);
  return formatter;
};

export default gendiff;
