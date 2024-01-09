import { readFileSync } from 'node:fs';
import path from 'node:path';

const fileParse = (filePath) => {
  if (path.extname(filePath) === '.json') {
    const parsedFile = JSON.parse(readFileSync(filePath, 'utf-8'));
    const keys = Object.keys(parsedFile);
    const sortedKeys = keys.sort();
    const sortedObject = {};
    sortedKeys.forEach((key) => {
      sortedObject[key] = parsedFile[key];
    });
    return sortedObject;
  }
  return filePath;
};

const getDifference = (file1, file2) => {
  let result = '';
  const parsedFile1 = fileParse(file1);
  const parsedFile2 = fileParse(file2);
  const entri = Object.entries(parsedFile1);

  entri.forEach(([key, value]) => {
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

export default getDifference;
