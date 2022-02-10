export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
export function getRandomInt(max: number = 10000000): number {
  return Math.floor(Math.random() * max);
}

export function addStyle(allStyles: string, newStyle: string): string {
  let result = '';
  if (allStyles.indexOf(';')) {
    result = allStyles.replace(';', `;${newStyle};`);
  } else {
    result = `"${newStyle};"`;
  }
  return result;
}

export function zipStr(str: string) {
  return str.replace(' ', '');
}

export function isEqual(lhs, rhs) {
  return lhs === rhs;
}
