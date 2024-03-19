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
            } // Если же данные разные
            else {
               result[key] = { case: 'sameKeyDiffValue', value: [currentValue1[key], currentValue2[key]] };
            }
          } // Если оба объекты с одинак ключом
          else if (_.isObject(currentValue1[key]) && _.isObject(currentValue2[key])) {
             result[key] = { case: 'sameKeysObjects', value: iter(currentValue1[key], currentValue2[key], depth + 2) };
          } // Если ключи одинаковые, но один объект, а другой нет
          else if (_.isObject(currentValue1[key]) && !_.isObject(currentValue2[key])) {
            result[key] = {
                case: 'firstObjSecondNot',
                value: [iter(currentValue1[key], currentValue1[key], depth + 2), currentValue2[key]]
            };
        } else {
            result[key] = {
                case: 'SecondObjFirstNot',
                value: [iter(currentValue2[key], currentValue2[key], depth + 2), currentValue1[key]]
            };
        }         
      }
      else if (Object.hasOwn(currentValue1, key)) {
        if (!Object.hasOwn(currentValue2, key)) {
          result[key] = {
            'case': _.isObject(currentValue1[key]) ? 'deletedObject' : 'deleted',
            'value': _.isObject(currentValue1[key]) ? iter(currentValue1[key], currentValue1[key], depth + 2) : currentValue1[key]
          };
        }
      } else {
        if (!_.isObject(currentValue2[key])) {
          result[key] = {
            case: 'added',
            value: currentValue2[key]
          };
        } else {
          result[key] = {
            case: 'addedObject',
            value: iter(currentValue2[key], currentValue2[key], depth + 2)
          };
        }
      }
    })
    return result;
  };
  return iter(parsedFile1, parsedFile2, 1);
}

export default getDiffObject;
