import fileParse from './fileParse.js';

const getDifference = (file1, file2) => {
  let result = '';
  const parsedFile1 = fileParse(file1);
  const parsedFile2 = fileParse(file2);

  const iter = (currentValue1, currentValue2, depth) => {
    const entriValue1 = Object.entries(currentValue1);
    const entriValue2 = Object.entries(currentValue2);
    const currentSpace = '  '.repeat(depth);
    const lines = entriValue1.flatMap(([key, val]) => {
      if (Object.hasOwn(currentValue2, key)) {
        if (typeof currentValue1[key] !== 'object' || typeof currentValue2[key] !== 'object' || currentValue1[key] === null || currentValue2[key] === null) {
          if (currentValue1[key] === currentValue2[key]) {
            return `${currentSpace}${key}: ${val}`;
          } else {
            // Если же данные разные
            return [`${currentSpace}- ${key}: ${val}`, `${currentSpace}+ ${key}: ${currentValue2[key]}`];
          }
        } else {
          return `${currentSpace}${key}: ${iter(currentValue1[key], currentValue2[key], depth + 1)}`;
        }
      } else {
        return `${currentSpace}- ${key}: ${JSON.stringify(val)}`;
      }
      entriValue2.flatMap(([key11, val111]) => {
        if (!Object.hasOwn(currentValue1, key11)) {
          return `${currentSpace}+ ${key11}: ${val111}`;
        }
        });
    })
    return [
      '{',
      ...lines,
      `${currentSpace}}`,
    ].join('\n');
  };

  console.log(iter(parsedFile1, parsedFile2, 1))
  return iter(parsedFile1, parsedFile2, 1);
}

  /* entri.forEach(([key, value]) => {
    console.log(key, value)
    // В случае если одинаковые названия ключей
    if (parsedFile2.hasOwnProperty(key)) {
      // Если данные по одинаковым ключам также идентичны
      if (parsedFile1[key] === parsedFile2[key]) {
        result = `${result}\n    ${key}: ${value}`;
      } else {
        // Если же данные разные
        result = `${result}\n  - ${key}: ${value}`;
        result = `${result}\n  + ${key}: ${parsedFile2[key]}`;
      }
    } else {
      // В случае если нет одинаковых ключей
      result = `${result}\n  - ${key}: ${value}`;
    }
  });
  // Добавляем ключи второго объекта в строку
  const entri2 = Object.entries(parsedFile2);
  entri2.forEach(([key, value]) => {
    if (!parsedFile1.hasOwnProperty(key)) {
      result = `${result}\n  + ${key}: ${value}`;
    }
  });
  result = `{${result}\n}`;
  return result;
};
*/

export default getDifference;
