import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const fileParse = (filePath) => {
  if ((path.extname(filePath)) === '.json') {
    const parsedFile = JSON.parse(readFileSync(filePath));
    const keys = Object.keys(parsedFile);
    const sortedKeys = keys.sort();
    const sortedObject = {};
    sortedKeys.forEach((key) => {
      sortedObject[key] = parsedFile[key];
    })
    return sortedObject;
  }
}

const getDifference = (file1, file2) => {
  let result = "";
  const parsedFile1 = fileParse(file1);
  const parsedFile2 = fileParse(file2);

  const entri = Object.entries(parsedFile1);
  for (const [key, value] of entri) {
    //В случае если одинаковые названия ключей
    if (Object.hasOwn(parsedFile2, key)) {
      //Если данные по одинаковым ключам также идентичны
      if (parsedFile1[key] === parsedFile2[key]) {
        result = `${result}\n    ${key}: ${value}`
      } //Если же данные разные
      else {
        result = `${result}\n  - ${key}: ${value}`;
        result = `${result}\n  + ${key}: ${parsedFile2[key]}`;
      }
    } // В случае если нет одинаковых ключей
    else {
      result = `${result}\n  - ${key}: ${value}`;
    }
  }
  //Добавляем ключи второго объекта в строку
  const entri2 = Object.entries(parsedFile2);
  for (const [key, value] of entri2) {
    if (!Object.hasOwn(parsedFile1, key)) {
      result = `${result}\n  + ${key}: ${value}`;
    }
  }
  result = `{${result}\n}`
  return result
}

export default getDifference