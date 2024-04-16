import _ from 'lodash';

const handleValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const getPlainFormat = (diffObject) => {
  const iter = (obj, keyPath) => {
    const keys = Object.keys(obj);

    const lines = keys.flatMap((key) => {
      if (obj[key].case === 'equal') {
        return [];
      }
      const fullKeyPath = !keyPath ? `${key}` : `${keyPath}.${key}`;

      if (obj[key].case === 'updated') {
        const { previousValue, newValue } = obj[key];
        return `Property '${fullKeyPath}' was updated. From ${handleValue(previousValue)} to ${handleValue(newValue)}`;
      }

      if (obj[key].case === 'nested') {
        return iter(obj[key].value, fullKeyPath);
      }

      if (obj[key].case === 'deleted') {
        return `Property '${fullKeyPath}' was removed`;
      }

      if (obj[key].case === 'added') {
        return `Property '${fullKeyPath}' was added with value: ${handleValue(obj[key].value)}`;
      }

      throw new Error(`Incorrect case: ${obj[key].case}`);
    });
    return [
      ...lines,
    ].join('\n');
  };
  return iter(diffObject);
};

export default getPlainFormat;
