import { TCtx } from './typeTemplator';
import {
  TAttribute, TInfoTag, TFullTInfoTag, TSettingsNode, TSettingsTextNode
} from './typeTemplator';
import { EDATA_PARAMS } from '../enumDataParams';

export function getPropertyCtx(obj: TCtx, path: string, defaultValue: unknown = ''): unknown {
  const keys = path.split('.');

  let result: unknown = obj;
  let lastKey = null;
  keys.forEach((key)=> {
    lastKey = key;
    result = (result as TCtx)[key];
  });

  if (typeof result === 'number' || typeof result === 'boolean' || typeof result === 'string') {
    return result;
  }
  if (typeof result === 'function') {
    return result;
  }
  return defaultValue;
}

export function getAttributesTag(rawStr: string): TAttribute[] {
  let _rawStr = rawStr;

  const regFullAtrribute: RegExp = /(.+?)=\s*(("|')(.*?)("|')|\w+)/gi;
  const attributes = [];
  let key = regFullAtrribute.exec(_rawStr);

  while (key) {
    const value = key[4] || key[4] === '' ? key[4] : `%withContext#${key[2]}`;
    attributes.push({
      fullStr: key[0],
      key: key[1].trim(),
      value: value.trim()
    });
    key = regFullAtrribute.exec(_rawStr);
  }
  attributes.forEach((att) => {
    _rawStr = _rawStr.split(att.fullStr).join('');
  });
  attributes.push(
    ..._rawStr.split(' ').filter(a => a).map(att => {
      return {
        key: att,
        value: true
      };
    })
  );

  return attributes.map(att => ({ key: att.key as string, value: att.value as string }));
}

export function getNameTag(rawStr: string): string {
  const regNameTag: RegExp = /^(\w+)\s/;
  const resReg = rawStr.match(regNameTag);
  const nameTag: string = resReg ? resReg[1] : rawStr;
  return nameTag;
}

export function parseTInfoTag(initialStr: string): TInfoTag {
  const result: TInfoTag = {
    name: '',
    attributes: []
  };
  let rawStr: string = initialStr.trim();
  result.name = getNameTag(rawStr);
  rawStr = rawStr.slice(result.name.length).trim();
  if (rawStr.length) {
    result.attributes = getAttributesTag(rawStr);
  }

  return result;
}

export function getInfoSingleTag(tag: RegExpMatchArray): TFullTInfoTag {
  const { name, attributes }: TInfoTag = parseTInfoTag(tag[1]);
  const result: TFullTInfoTag = {
    name,
    attributes,
    indexEndInTmpl: tag[0].length,
    typeTag: 'singleTag',
    isChild: false
  };
  return result;
}

export function getInfoFullTag(tag: RegExpMatchArray, rawStr: string): TFullTInfoTag {
  const { name, attributes }: TInfoTag = parseTInfoTag(tag[1]);
  const regCurrentClosingTag: RegExp = new RegExp(`</${name}\\s*>`, 'g');
  const regCurrentOpeningTag: RegExp = new RegExp(`<${name}.*?\\s*>`, 'g');
  regCurrentOpeningTag.lastIndex = tag[0].length;
  let indexEndInTmpl: number = 0;
  let closingTag = null;
  let isEndTagFound: boolean = false;
  let content: string = '';
  while (!isEndTagFound) {
    const alsoOpeningTag = regCurrentOpeningTag.exec(rawStr);
    closingTag = regCurrentClosingTag.exec(rawStr);
    if (!alsoOpeningTag || (closingTag && alsoOpeningTag.index > closingTag.index)) {
      isEndTagFound = true;
      indexEndInTmpl = regCurrentClosingTag.lastIndex;
    }
  }
  if (closingTag) {
    content = rawStr.slice(tag[0].length, closingTag.index);
  }
  return {
    name,
    attributes,
    content,
    indexEndInTmpl,
    typeTag: 'fullTag',
    isChild: false
  };
}

export function getTag(rawStr: string): TFullTInfoTag | null {
  const regSingleTag: RegExp = /<(.[^>]+?)\/>{1}?/;
  const regOpeningTag: RegExp = /<(.+?)>/;

  const singleTag: RegExpMatchArray | null = rawStr.match(regSingleTag);
  const openingTag: RegExpMatchArray | null = rawStr.match(regOpeningTag);
  let result: TFullTInfoTag | null = null;

  if (singleTag && singleTag.index === 0) {
    result = getInfoSingleTag(singleTag);
  } else if (openingTag && openingTag.index === 0) {
    result = getInfoFullTag(openingTag, rawStr);
  }
  if (result) {
    result.isChild = result?.name[0] === result?.name[0].toUpperCase();
  }

  return result;
}

export function getText(tmpl: string): string {
  const reqSearchText: RegExp = /[^<]+/;
  const text = tmpl.match(reqSearchText);
  return text ? text[0] : '';
}

export function getTSettingsNode(tmpl: string): TSettingsNode | TSettingsTextNode {
  const tag = getTag(tmpl);
  let _settingsNode: TSettingsNode | TSettingsTextNode;
  if (tag) {
    _settingsNode = {
      ...tag,
      typeEl: 'el',
      el: null
    };
  } else {
    const textContent: string = getText(tmpl);
    _settingsNode = {
      typeEl: 'text',
      content: textContent,
      indexEndInTmpl: textContent.length
    };
  }
  return _settingsNode;
}

export function markChildInTemplate(template: string) {
  const regExpChild = /<([A-Z]\w+).[^>]*?\/>/g;
  let _template = template;
  let key = regExpChild.exec(_template);

  let i = 0;
  while (key) {
    const strReplace = key[0].replace(key[1], `${key[1]} ${EDATA_PARAMS.NUMBER_CHILD}="${i}" `);
    _template = _template.replace(key[0], strReplace);
    i++;
    regExpChild.lastIndex = regExpChild.lastIndex - key[0].length + strReplace.length;
    key = regExpChild.exec(_template);
  }

  return _template;
}
