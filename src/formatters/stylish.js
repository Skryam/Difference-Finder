import _ from 'lodash';

const space = ' ';

const objToString = (getObj, depth) => {
  if (!_.isObject(getObj)) {
    return getObj;
  }
  const indentSize = space.repeat(2 * depth);
  const getKeys = Object.keys(getObj);
  const bracketIndent = space.repeat((2 * depth) - 2);
  const result = getKeys.map((key) => {
    const value = getObj[key];
    if (!_.isObject(value)) {
      return `${indentSize}  ${key}: ${value}`;
    } return `${indentSize}  ${key}: ${objToString(value, depth + 2)}`;
  });
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylishFormat = (diffObject) => {
  const iter = (obj, depth) => {
    const keys = Object.keys(obj);
    const indentSize = 2 * depth;
    const currentSpace = space.repeat(indentSize);
    const bracketIndent = space.repeat(indentSize - 2);

    const lines = keys.flatMap((key) => {
      if (obj[key].case === 'equal') {
        return `${currentSpace}  ${key}: ${obj[key].value}`;
      }
      // Если же данные разные
      if (obj[key].case === 'updated') {
        const { previousValue, newValue } = obj[key];
        return [`${currentSpace}- ${key}: ${objToString(previousValue, depth + 2)}`, `${currentSpace}+ ${key}: ${objToString(newValue, depth + 2)}`];
      }

      if (obj[key].case === 'nested') {
        return `${currentSpace}  ${key}: ${iter(obj[key].value, depth + 2)}`;
      }

      // Уникальные из первого
      if (obj[key].case === 'deleted') return `${currentSpace}- ${key}: ${objToString(obj[key].value, depth + 2)}`;

      // Уникальные из второго
      if (obj[key].case === 'added') return `${currentSpace}+ ${key}: ${objToString(obj[key].value, depth + 2)}`;

      throw new Error(`Received wrong case: ${obj[key].case}`);
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(diffObject, 1);
};

export default stylishFormat;
