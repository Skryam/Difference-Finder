import _ from 'lodash';

const objToString = (getObj) => {
  if (_.isObject(getObj)) {
    return '[complex value]';
  } return typeof getObj === 'string' ? `'${getObj}'` : getObj;
};

const plainFormat = (diffObject) => {
  const iter = (obj, prevKey) => {
    const keys = Object.keys(obj);

    const lines = keys.flatMap((key) => {
      if (obj[key].case === 'equal') {
        return [];
      }
      const forPrev = (!prevKey) ? `${key}` : `${prevKey}.${key}`;

      if (obj[key].case === 'updated') {
        const { previousValue, newValue } = obj[key];
        return `Property '${forPrev}' was updated. From ${objToString(previousValue)} to ${objToString(newValue)}`;
      }

      if (obj[key].case === 'nested') {
        return iter(obj[key].value, forPrev);
      }

      // Уникальные из первого
      if (obj[key].case === 'deleted') {
        return `Property '${forPrev}' was removed`;
      }

      // Уникальные из второго
      if (obj[key].case === 'added') {
        return `Property '${forPrev}' was added with value: ${objToString(obj[key].value)}`;
      }
      throw new Error(`Incorrect case: ${obj[key].case}`);
    });
    // console.log(lines)
    return [
      ...lines,
    ].join('\n');
  };

  // console.log(diffObject.common);
  return iter(diffObject);
};

export default plainFormat;
