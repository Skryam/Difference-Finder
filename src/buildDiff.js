import _ from 'lodash';
import fileParse from './fileParse.js';

const buildDiff = (filePath1, filePath2) => {
  const parsedFile1 = fileParse(filePath1);
  const parsedFile2 = fileParse(filePath2);

  const iter = (currentValue1, currentValue2, depth) => {
    const objectsKeys = [...Object.keys(currentValue1), ...Object.keys(currentValue2)];
    const uniqueSortedKeys = objectsKeys
      .filter((item, index) => objectsKeys.indexOf(item) === index)
      .sort();
    return uniqueSortedKeys.reduce((acc, key) => {
      if (_.isObject(currentValue1[key]) && _.isObject(currentValue2[key])) {
        return {
          ...acc,
          [key]: {
            case: 'nested',
            value: iter(currentValue1[key], currentValue2[key], depth + 2),
          },
        };
      }

      if (Object.hasOwn(currentValue1, key) && !Object.hasOwn(currentValue2, key)) {
        return {
          ...acc,
          [key]: {
            case: 'deleted',
            value: currentValue1[key],
          },
        };
      }

      if (!Object.hasOwn(currentValue1, key) && Object.hasOwn(currentValue2, key)) {
        return {
          ...acc,
          [key]: {
            case: 'added',
            value: currentValue2[key],
          },
        };
      }

      if (currentValue1[key] !== currentValue2[key]) {
        return {
          ...acc,
          [key]: {
            case: 'updated',
            previousValue: currentValue1[key],
            newValue: currentValue2[key],
          },
        };
      }

      return {
        ...acc,
        [key]: {
          case: 'equal',
          value: currentValue1[key],
        },
      };
    }, {});
  };
  return iter(parsedFile1, parsedFile2, 1);
};

export default buildDiff;
