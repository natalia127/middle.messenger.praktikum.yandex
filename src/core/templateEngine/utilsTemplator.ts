import {
  attribute, infoTag, fullInfoTag, settingsNode, settingsTextNode
} from './typeTemplator';

export function getPropertyCtx(obj: unknown, path, defaultValue: unknown = ''): unknown {
  const keys = path.split('.');

  let result: unknown = obj;
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
  let key: RegExpExecArray = regFullAtrribute.exec(_rawStr);
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

  /* eslint no-param-reassign: ["error",
    { "props": true, "ignorePropertyModificationsFor": ["att"] }]
  */
  attributes.forEach(att => {
    delete att.fullStr;
  });

  return attributes;
}

export function getNameTag(rawStr: string): string {
  const regNameTag: RegExp = /^(\w+)\s/;
  const resReg: RegExpMatchArray = rawStr.match(regNameTag);
  const nameTag: string = resReg ? resReg[1] : rawStr;
  return nameTag;
}

export function parseInfoTag(initialStr: string): infoTag {
  const result: infoTag = {
    name: null,
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

export function getInfoSingleTag(tag): fullInfoTag {
  const { name, attributes }: infoTag = parseInfoTag(tag[1]);
  const result: fullInfoTag = {
    name,
    attributes,
    indexEndInTmpl: tag[0].length,
    typeTag: 'singleTag'
  };
  return result;
}

export function getInfoFullTag(tag, rawStr: string): fullInfoTag {
  const { name, attributes }: infoTag = parseInfoTag(tag[1]);
  const regCurrentClosingTag: RegExp = new RegExp(`</${name}\\s*>`, 'g');
  const regCurrentOpeningTag: RegExp = new RegExp(`<${name}.*?\\s*>`, 'g');
  regCurrentOpeningTag.lastIndex = tag[0].length;
  let indexEndInTmpl: number = 0;
  let closingTag: RegExpExecArray = null;
  let isEndTagFound: boolean = false;
  let content: string = '';
  while (!isEndTagFound) {
    const alsoOpeningTag: RegExpExecArray = regCurrentOpeningTag.exec(rawStr);
    closingTag = regCurrentClosingTag.exec(rawStr);
    if (!alsoOpeningTag || alsoOpeningTag.index > closingTag.index) {
      isEndTagFound = true;
      indexEndInTmpl = regCurrentClosingTag.lastIndex;
    }
  }
  content = rawStr.slice(tag[0].length, closingTag.index);
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

export function getTag(rawStr: string): fullInfoTag {
  const regSingleTag: RegExp = /<(.[^>]+?)\/>{1}?/;
  const regOpeningTag: RegExp = /<(.+?)>/;

  const singleTag: RegExpMatchArray = rawStr.match(regSingleTag);
  const openingTag: RegExpMatchArray = rawStr.match(regOpeningTag);
  let result: fullInfoTag = null;
  if (singleTag && singleTag.index === 0) {
    result = getInfoSingleTag(singleTag);
  } else if (openingTag && openingTag.index === 0) {
    result = getInfoFullTag(openingTag, rawStr);
  }
  return result;
}

export function getText(tmpl: string): string {
  const reqSearchText: RegExp = /[^<]+/;
  const text: RegExpMatchArray = tmpl.match(reqSearchText);
  return text ? text[0] : '';
}

export function getSettingsNode(tmpl): settingsNode | settingsTextNode {
  const tag: fullInfoTag = getTag(tmpl);
  let _settingsNode: settingsNode | settingsTextNode = null;
  if (tag) {
    _settingsNode = {
      ...tag,
      typeEl: 'el'
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
