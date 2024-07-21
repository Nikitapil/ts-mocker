export const replaceBracketValues = (str: string, callback: (value: string, index: number, array: string[]) => string) => {
  const values = [...str.matchAll(/\{([^{}]+)\}/g)].map(match => match[1]);
  const replacedValues = values.map(callback);
  return values.reduce((acc, value, index) => acc.replace(value, replacedValues[index]), str);
}