import fileParse from './fileParse.js';
import _ from 'lodash';

const getDiffObject = (file1, file2) => {
  const parsedFile1 = fileParse(file1);
  const parsedFile2 = fileParse(file2);

  const iter = (currentValue1, currentValue2, depth) => {
    let result = {};
    const objectsKeys = [Object.keys(currentValue1), Object.keys(currentValue2)].flat();
    const uniqueKeys = objectsKeys.filter((item, index) => objectsKeys.indexOf(item) === index).sort();
    const lines = uniqueKeys.filter((key) => {
      // Если есть в обоих
      if (Object.hasOwn(currentValue1, key) && Object.hasOwn(currentValue2, key)) {
        // Если оба НЕ объекты
        if (!_.isObject(currentValue1[key]) && !_.isObject(currentValue2[key])) {
          // Если равны по значениям
            if (currentValue1[key] === currentValue2[key]) {
               result[key] = { case: 'equal', value: currentValue1[key] };
            } else {
              result[key] = { case: 'updated', value: [currentValue1[key], currentValue2[key]] };
           }
          } // Если оба объекты
          else if (_.isObject(currentValue1[key]) && _.isObject(currentValue2[key])) {
             result[key] = { case: 'nested', value: iter(currentValue1[key], currentValue2[key], depth + 2) };
          } // Если же данные разные
          else {
             result[key] = { case: 'updated', value: [currentValue1[key], currentValue2[key]] };
          }
      } // Уникальные из первого 
      else if (Object.hasOwn(currentValue1, key) && !Object.hasOwn(currentValue2, key)) {
           result[key] = { case: 'deleted', value: currentValue1[key] };
        }
       // Уникальные из второго
      else {
           result[key] = { case: 'added', value: currentValue2[key] };
      }
    })
    return result;
  };
  return iter(parsedFile1, parsedFile2, 1);
}

export default getDiffObject;
