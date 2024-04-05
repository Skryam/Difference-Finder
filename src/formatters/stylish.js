import _ from 'lodash';

const objToString = (getObj, depth) => {
  const space = ' '.repeat(2 * depth);
  const getKeys = Object.keys(getObj);
  const bracketIndent = ' '.repeat((2 * depth) - 2);
  const result = getKeys.map((key) => {
    const value = getObj[key];
    if (!_.isObject(value)) {
      return `${space}  ${key}: ${value}`;
    } return `${space}  ${key}: ${objToString(value, depth + 2)}`;
  });
  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylishFormat = (diffObject) => {
  console.log(diffObject.common);
  const iter = (obj, depth) => {
    const keys = Object.keys(obj);
    const indentSize = 2 * depth;
    const currentSpace = ' '.repeat(indentSize);
    const bracketIndent = ' '.repeat(indentSize - 2);

    const lines = keys.flatMap((key) => {
      if (obj[key].case === 'equal') {
        return `${currentSpace}  ${key}: ${obj[key].value}`;
      }
      // Если же данные разные
      if (obj[key].case === 'updated') {
        const value1 = obj[key].previousValue;
        const value2 = obj[key].newValue;
        if (!_.isObject(value1) && !_.isObject(value2)) {
          return [`${currentSpace}- ${key}: ${value1}`, `${currentSpace}+ ${key}: ${value2}`];
        }
        if (_.isObject(value1) && !_.isObject(value2)) {
          return [`${currentSpace}- ${key}: ${objToString(value1, depth + 2)}`, `${currentSpace}+ ${key}: ${value2}`];
        }

        return [`${currentSpace}- ${key}: ${value1}`, `${currentSpace}+ ${key}: ${objToString(value2, depth + 2)}`];
      }

      if (obj[key].case === 'nested') {
        return `${currentSpace}  ${key}: ${iter(obj[key].value, depth + 2)}`;
      }

      // Уникальные из первого
      if (obj[key].case === 'deleted') {
        if (!_.isObject(obj[key].value)) {
          return `${currentSpace}- ${key}: ${obj[key].value}`;
        } return `${currentSpace}- ${key}: ${objToString(obj[key].value, depth + 2)}`;
      }
      // Уникальные из второго
      if (obj[key].case === 'added') {
        if (!_.isObject(obj[key].value)) {
          return `${currentSpace}+ ${key}: ${obj[key].value}`;
        } return `${currentSpace}+ ${key}: ${objToString(obj[key].value, depth + 2)}`;
      }
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
