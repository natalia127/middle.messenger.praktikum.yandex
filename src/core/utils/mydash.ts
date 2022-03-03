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

type Indexed<T = unknown> = {
  [key in string]: T;
};

function isObject(item: unknown) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
function merge(lhs: Indexed, rhs: Indexed) {
  if (!rhs) return lhs;

  if (isObject(lhs) && isObject(rhs)) {
    Object.keys(rhs).forEach(key => {
      if (isObject(rhs[key])) {
        if (!lhs[key]) {
          Object.assign(lhs, { [key]: {} });
        }
        merge(lhs[key] as Indexed, rhs[key] as Indexed);
      } else {
        Object.assign(lhs, { [key]: rhs[key] });
      }
    });
  }

  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (!isObject(object)) {
    return object;
  }
  const aPath = path.split('.').filter(a=>a);
  const rPath = aPath.reduceRight((acc, p) => {
    return { [p]: acc };
  }, value);
  return merge(object as Indexed, rPath as Indexed);
}

type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqualString(lhs: String, rhs: String) {
  return lhs === rhs;
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }
  let result = true;
  Object.entries(lhs).forEach(([key, value])=>{
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (!isEqual(value, rightValue)) {
        result = false;
      }
    }

    if (value !== rightValue) {
      result = false;
    }
  });

  return result;
}

export const getObjIntersection = function (obj1: {
  [key: string]: any}, obj2: {[key: string]: any}) {
  return Object.keys(obj2).reduce((acc: {[key: string]: any}, key)=>{
    if (obj1[key]) {
      acc[key] = obj1[key];
    }
    return acc;
  }, {});
};

export const setLink = (target: Record<string, any>, path: string[], value: unknown)=>{
  path.reduce((acc, p, index) => {
    if (index === path.length - 1) {
      acc[p] = value;
    } else if (!acc[p]) {
      acc[p] = {};
    }
    return acc[p];
  }, target);
};
