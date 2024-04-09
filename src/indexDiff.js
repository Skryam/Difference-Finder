import _ from 'lodash';
import fileParse from './fileParse.js';

const getDiffObject = (file1, file2) => {
  const parsedFile1 = fileParse(file1);
  const parsedFile2 = fileParse(file2);

  const iter = (currentValue1, currentValue2, depth) => {
    const result = {};
    const objectsKeys = [...Object.keys(currentValue1), ...Object.keys(currentValue2)];
    const uniqueKeys = objectsKeys
      .filter((item, index) => objectsKeys.indexOf(item) === index)
      .sort();
    uniqueKeys.map((key) => {
      // Если оба объекты
      if (_.isObject(currentValue1[key]) && _.isObject(currentValue2[key])) {
        result[key] = { case: 'nested', value: iter(currentValue1[key], currentValue2[key], depth + 2) };
      } else if (Object.hasOwn(currentValue1, key) && !Object.hasOwn(currentValue2, key)) {
        // Уникальные из первого
        result[key] = { case: 'deleted', value: currentValue1[key] };
      } else if (!Object.hasOwn(currentValue1, key) && Object.hasOwn(currentValue2, key)) {
        // Уникальные из второго
        result[key] = { case: 'added', value: currentValue2[key] };
      } else if (currentValue1[key] !== currentValue2[key]) {
        // Если же данные разные
        result[key] = { case: 'updated', previousValue: currentValue1[key], newValue: currentValue2[key] };
      } else {
        result[key] = { case: 'equal', value: currentValue1[key] };
      }
    });
    return result;
  };
  return iter(parsedFile1, parsedFile2, 1);
};

export default getDiffObject;
