import getDifference from '../indexDiff.js';
import _ from 'lodash';

const stylishFormat = (diffObject) => {

  const iter = (obj, depth) => {
    const keys = Object.keys(obj);
    const indentSize = 2 * depth;
    const currentSpace = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);
    const lines = keys.flatMap((key) => {
          if (obj.case === 'equal') {
            return `${currentSpace}  ${key}: ${obj[key]}`;
          } // Если же данные разные
          else if (obj.case === 'sameKeyDiffValue') {
            return [`${currentSpace}- ${key}: ${obj}`, `${currentSpace}+ ${key}: ${obj[key]}`];
          }
        else if (_.isObject(obj[key]) && _.isObject(obj[key])) {
          return `${currentSpace}  ${key}: ${iter(obj[key], obj[key], depth + 2)}`;
        }
        else if (_.isObject(obj[key]) && !_.isObject(obj[key])) {
          return [`${currentSpace}- ${key}: ${iter(obj[key], obj[key], depth + 2)}`, `${currentSpace}+ ${key}: ${obj[key]}`];
        } else {
          [`${currentSpace}- ${key}: ${obj[key]}`, `${currentSpace}- ${key}: ${iter(obj[key], obj[key], depth + 2)}`];
        }
      } // Уникальные из первого 
      else if (Object.hasOwn(obj, key) && !Object.hasOwn(obj, key)) {
        if (!_.isObject(obj[key])) {
          return `${currentSpace}- ${key}: ${obj[key]}`;
        } else return `${currentSpace}- ${key}: ${iter(obj[key], obj[key], depth + 2)}`;
      } // Уникальные из второго
      else {
        if (!_.isObject(obj[key])) {
          return `${currentSpace}+ ${key}: ${obj[key]}`;
        } else return `${currentSpace}+ ${key}: ${iter(obj[key], obj[key], depth + 2)}`;
      }
    })

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  //console.log(iter(parsedFile1, parsedFile2, 1));
  return iter(diffObject, 1);
}

export default stylishFormat;
