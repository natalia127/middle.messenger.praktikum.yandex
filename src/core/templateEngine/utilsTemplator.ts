import { ctxType } from './typeTemplator';
import {
  attribute, infoTag, fullInfoTag, settingsNode, settingsTextNode
} from './typeTemplator';

export function getPropertyCtx(obj: ctxType, path: string, defaultValue: unknown = ''): unknown {
  const keys = path.split('.');

  let result = obj;
  keys.forEach((key)=> {
    result = result[key];
  });

  if (typeof result !== 'object' && typeof result !== 'undefined') {
    return result;
  }
  return defaultValue;
}

export function getAttributesTag(rawStr: string): attribute[] {
  let _rawStr = rawStr;
  const regFullAtrribute: RegExp = /(.+?)=\s*("|')(.+?)("|')/gi;
  const attributes = [];
  let key = regFullAtrribute.exec(_rawStr);
  while (key) {
    attributes.push({
      fullStr: key[0],
      key: key[1].trim(),
      value: key[3].trim()
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

export function parseInfoTag(initialStr: string): infoTag {
  const result: infoTag = {
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

export function getInfoSingleTag(tag: RegExpMatchArray): fullInfoTag {
  const { name, attributes }: infoTag = parseInfoTag(tag[1]);
  const result: fullInfoTag = {
    name,
    attributes,
    indexEndInTmpl: tag[0].length,
    typeTag: 'singleTag'
  };
  return result;
}

export function getInfoFullTag(tag: RegExpMatchArray, rawStr: string): fullInfoTag {
  const { name, attributes }: infoTag = parseInfoTag(tag[1]);
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
    typeTag: 'fullTag'
  };
}

export function setAttributes(el: HTMLElement, attributes: attribute[]) {
  attributes.forEach((att => {
    if (att.key === 'class') {
      att.value.split(' ').filter(a => a).forEach((className => el.classList.add(className)));
    } else {
      el.setAttribute(att.key, att.value);
    }
  }));
}

export function getTag(rawStr: string): fullInfoTag | null {
  const regSingleTag: RegExp = /<(.[^>]+?)\/>{1}?/;
  const regOpeningTag: RegExp = /<(.+?)>/;

  const singleTag: RegExpMatchArray | null = rawStr.match(regSingleTag);
  const openingTag: RegExpMatchArray | null = rawStr.match(regOpeningTag);
  let result: fullInfoTag | null = null;

  if (singleTag && singleTag.index === 0) {
    result = getInfoSingleTag(singleTag);
  } else if (openingTag && openingTag.index === 0) {
    result = getInfoFullTag(openingTag, rawStr);
  }
  return result;
}

export function getText(tmpl: string): string {
  const reqSearchText: RegExp = /[^<]+/;
  const text = tmpl.match(reqSearchText);
  return text ? text[0] : '';
}

export function getSettingsNode(tmpl: string): settingsNode | settingsTextNode {
  const tag = getTag(tmpl);
  let _settingsNode: settingsNode | settingsTextNode;
  if (tag) {
    _settingsNode = {
      ...tag,
      typeEl: 'el',
      el: null
    };

    if (tag.typeTag === 'singleTag') {
      const singleEL: HTMLElement = document.createElement(tag.name);
      setAttributes(singleEL, tag.attributes);
      _settingsNode.el = singleEL;
    }
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
