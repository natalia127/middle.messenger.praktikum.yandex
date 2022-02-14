import { EDATA_PARAMS } from './enumDataParams';
import {
  TDataMock
} from './typeTemplator';
import {
  IBlock
} from './typeBlock';
// TODO T должен быть только одним из типов из EnumDataParamsf
export const parseDataMock = function<T extends string> (
  el: Element,
  nameData: T
): TDataMock | undefined {
  const strParamsEvents = el.getAttribute(nameData);

  if (!strParamsEvents) {
    return;
  }
  const paramsEvents = strParamsEvents.split(';').filter(a=>a);

  const result = paramsEvents.map((paramEvent: string) => {
    const [key, value] = paramEvent.split(':');
    return { key, value };
  });
  // eslint-disable-next-line consistent-return
  return result;
};

export const getPropsWithMock = function (el: Element) {
  const rawPropsChild = parseDataMock(el, EDATA_PARAMS.PROPS);
  const propsChild = rawPropsChild ? rawPropsChild.reduce((
    acc: {[key: string]: string},
    prop
  )=>{
    const { key: nameProp, value } = prop;
    acc[nameProp] = value;
    return acc;
  }, {}) : {};
  return propsChild;
};

export const getParametrsWithMock = function (el: Element) {
  const nameChild = el.getAttribute(EDATA_PARAMS.CHILD);
  const nChild = el.getAttribute(EDATA_PARAMS.NUMBER_CHILD);
  const paramsEvents = parseDataMock(el, EDATA_PARAMS.EVENTS);
  const propsChild = getPropsWithMock(el);
  return {
    nameChild, nChild, paramsEvents, propsChild
  };
};
