import getDifference from '../indexDiff.js';
import _ from 'lodash';

const stylishFormat = (diffObject) => {
  console.log(diffObject.common)

  const iter = (obj, depth) => {
    const keys = Object.keys(obj);
    const indentSize = 2 * depth;
    const currentSpace = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);
    const lines = keys.flatMap((key) => {
          if (obj[key].case === 'equal') {
            return `${currentSpace}  ${key}: ${obj[key].value}`;
          } // Если же данные разные
          else if (obj[key].case === 'sameKeyDiffValue') {
            return [`${currentSpace}- ${key}: ${obj[key].value[0]}`, `${currentSpace}+ ${key}: ${obj[key].value[1]}`];
          }
          else if (obj[key].case === 'firstObjSecondNot') {
            return [`${currentSpace}- ${key}: ${iter(obj[key].value[0], depth + 2)}`, `${currentSpace}+ ${key}: ${obj[key].value[1]}`]
          }
          else if (obj[key].case === 'SecondObjFirstNot') {
            return [`${currentSpace}- ${key}: ${obj[key].value[0]}`, `${currentSpace}+ ${key}: ${iter(obj[key].value[1], depth + 2)}`]
          }
        else if (obj[key].case === 'sameKeysObjects') {
          return `${currentSpace}  ${key}: ${iter(obj[key].value, depth + 2)}`;
        }
         // Уникальные из первого 
      else if (obj[key].case === 'deleted') {
          return `${currentSpace}- ${key}: ${obj[key].value}`;
        }
      else if (obj[key].case === 'deletedObject') {
        return `${currentSpace}- ${key}: ${iter(obj[key].value, depth + 2)}`;
      }
       // Уникальные из второго
       else if (obj[key].case === 'added') {
        return `${currentSpace}+ ${key}: ${obj[key].value}`;
      }
    else if (obj[key].case === 'addedObject') {
      return `${currentSpace}+ ${key}: ${iter(obj[key].value, depth + 2)}`;
    }
    })

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  console.log(iter(diffObject, 1));
  return iter(diffObject, 1);
}

export default stylishFormat;
