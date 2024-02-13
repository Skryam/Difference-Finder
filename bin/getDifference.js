import fileParse from './fileParse.js';
import _ from 'lodash';

const getDifference = (file1, file2) => {
  const parsedFile1 = fileParse(file1);
  const parsedFile2 = fileParse(file2);

  const iter = (currentValue1, currentValue2, depth) => {
    const objectsKeys = [Object.keys(currentValue1), Object.keys(currentValue2)].flat();
    const uniqueKeys = objectsKeys.filter((item, index) => objectsKeys.indexOf(item) === index).sort();
    const indentSize = 2 * depth;
    const currentSpace = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);
    const lines = uniqueKeys.flatMap((key) => {
      // Если есть в обоих
      if (Object.hasOwn(currentValue1, key) && Object.hasOwn(currentValue2, key)) {
        // Если оба НЕ объекты
        if (!_.isObject(currentValue1[key]) && !_.isObject(currentValue2[key])) {
          // Если равны по значениям
          if (currentValue1[key] === currentValue2[key]) {
            return `${currentSpace}  ${key}: ${currentValue1[key]}`;
          } // Если же данные разные
          else {
            return [`${currentSpace}- ${key}: ${currentValue1[key]}`, `${currentSpace}+ ${key}: ${currentValue2[key]}`];
          }
        } 
        else if (_.isObject(currentValue1[key]) && _.isObject(currentValue2[key])) {
          return `${currentSpace}  ${key}: ${iter(currentValue1[key], currentValue2[key], depth + 2)}`;
        }
        else if (_.isObject(currentValue1[key]) && !_.isObject(currentValue2[key])) {
          return [`${currentSpace}- ${key}: ${iter(currentValue1[key], currentValue1[key], depth + 2)}`, `${currentSpace}+ ${key}: ${currentValue2[key]}`];
        } else {
          [`${currentSpace}- ${key}: ${currentValue1[key]}`, `${currentSpace}- ${key}: ${iter(currentValue2[key], currentValue2[key], depth + 2)}`];
        }
      } // Уникальные из первого 
      else if (Object.hasOwn(currentValue1, key) && !Object.hasOwn(currentValue2, key)) {
        if (!_.isObject(currentValue1[key])) {
          return `${currentSpace}- ${key}: ${currentValue1[key]}`;
        } else return `${currentSpace}- ${key}: ${iter(currentValue1[key], currentValue1[key], depth + 2)}`;
      } // Уникальные из второго
      else {
        if (!_.isObject(currentValue2[key])) {
          return `${currentSpace}+ ${key}: ${currentValue2[key]}`;
        } else return `${currentSpace}+ ${key}: ${iter(currentValue2[key], currentValue2[key], depth + 2)}`;
      }
    })

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  console.log(iter(parsedFile1, parsedFile2, 1));
  return iter(parsedFile1, parsedFile2, 1);
}

export default getDifference;
