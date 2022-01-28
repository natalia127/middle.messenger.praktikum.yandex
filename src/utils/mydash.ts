export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
export function getRandomInt(max: number = 10000000): number {
  return Math.floor(Math.random() * max);
}
