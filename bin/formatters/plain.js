import getDifference from '../indexDiff.js';
import _ from 'lodash';

const plainFormat = (diffObject) => {
  //console.log(diffObject.common)
  const forStr = (val) => typeof val === 'string' ? `'${val}'` : val;

  const iter = (obj, prevKey) => {
    const keys = Object.keys(obj);
    const lines = keys.flatMap((key) => {
      const forPrev = () => prevKey === undefined ? `${key}` : `${prevKey}.${key}`;
           if (obj[key].case === 'sameKeyDiffValue') {
            return `Property '${prevKey}.${key}' was updated. From ${forStr(obj[key].value[0])} to ${forStr(obj[key].value[1])}`;
          }
          else if (obj[key].case === 'firstObjSecondNot') {
            return `Property '${prevKey}.${key}' was updated. From [complex value] to ${forStr(obj[key].value[1])}`;
          }
        else if (obj[key].case === 'sameKeysObjects') {
          console.log(forPrev)
          return iter(obj[key].value, forPrev());
        }
         // Уникальные из первого 
      else if (obj[key].case === 'deleted') {
          return `Property '${prevKey}.${key}' was removed`;
        }
      else if (obj[key].case === 'deletedObject') {
        return `Property '${key}' was removed`;
      }
       // Уникальные из второго
       else if (obj[key].case === 'added') {
        return `Property '${prevKey}.${key}' was added with value: ${forStr(obj[key].value)}`;
      }
    else if (obj[key].case === 'addedObject') {
      return `Property '${forPrev()}' was added with value: [complex value]`;
    }
    })
    console.log(lines)
    return [
      ...lines,
    ].join('\n');
  };

   // console.log(diffObject.common);
  return iter(diffObject);
}

export default plainFormat;
