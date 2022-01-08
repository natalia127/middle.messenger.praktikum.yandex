export function getPropertyCtx(obj, path, defaultValue) {
  const keys = path.split('.');

  let result = obj;
  for (let key of keys) {
      result = result[key];

      if (result === undefined) {
          return defaultValue;        
      }
  }

  return result ?? defaultValue;
} 

export function getAttributesTag(rawStr){
  const regFullAtrribute = /(.+?)=\s*("|')(.+?)("|')/gi;
  const attributes = []
  let key = null
  
  while ((key = regFullAtrribute.exec(rawStr))) {
    attributes.push({
      fullStr: key[0],
      key: key[1].trim(),
      value: key[3].trim()
    })
  }
  attributes.forEach((att) => {
    rawStr = rawStr.split(att.fullStr).join('')
  })
  attributes.push(
    ...rawStr.split(' ').filter(a => a).map(att => {
        return {
          key: att,
          value: true
        }   
     }
  ))
  attributes.forEach(att => {
    delete att.fullStr
  })
  return attributes
}

export function getNameTag(rawStr){
  const regNameTag = /^(\w+)\s/;
  let nameTag = rawStr.match(regNameTag);
  nameTag = nameTag? nameTag[1] : rawStr
  return nameTag;
}

export function parseInfoTag(initialStr) {
  const result = {
    name: null,
    attributes: []
  }
  let rawStr = initialStr.trim(); 
  result.name = getNameTag(rawStr)
  rawStr = rawStr.slice(result.name.length).trim();
  if (rawStr.length) {
    result.attributes = getAttributesTag(rawStr);
  }
  return result

}

export function getInfoSingleTag(tag) {
  let {name, attributes} = parseInfoTag(tag[1])
  let result = {name, attributes};
  result.indexSlice = tag[0].length
  return result
}

export function getInfoFullTag(tag, rawStr) {
  let {name, attributes} = parseInfoTag(tag[1])
  let indexSlice = 0;
  let regCurrentClosingTag = new RegExp(`<\/${name}\\s*>`, 'g');
  let regCurrentOpeningTag = new RegExp(`<${name}.*?\\s*>`, 'g');
  regCurrentOpeningTag.lastIndex = tag[0].length
  let closingTag = null;
  let isEndTagFound = false;
  let content = '';
  while (!isEndTagFound) {
    let alsoOpeningTag = regCurrentOpeningTag.exec(rawStr)
    closingTag = regCurrentClosingTag.exec(rawStr)
    if (!alsoOpeningTag || alsoOpeningTag.index > closingTag.index) {
      isEndTagFound = true;
      indexSlice = regCurrentClosingTag.lastIndex;
    }
  }
  content = rawStr.slice(tag[0].length, closingTag.index);
  return {
    name,
    attributes,
    content,
    indexSlice
  }
}


export function setAttributes(el, attributes) {
  attributes.forEach((att => {
    if (att.key === 'class') {
      el.className = att.value
    } {
      el.setAttribute(att.key, att.value)
    }
  }))
}

export function getTag(rawStr){
  const reqSingleTag = /<(.[^>]+?)\/>{1}?/
  const regOpeningTag = /<(.+?)>/;
  
  let singleTag = rawStr.match(reqSingleTag)
  let openingTag = rawStr.match(regOpeningTag);
  let result = null;
  if (singleTag && singleTag.index === 0) {
    result = getInfoSingleTag(singleTag)
    result.type = 'singleTag'
  } else if (openingTag && openingTag.index === 0) {
    result = getInfoFullTag(openingTag, rawStr)
    result.type = 'fullTag'
  }
  return result
}

export function getText (tmpl) {
  const reqSearchText = /[^<]+/
  let text = tmpl.match(reqSearchText)
  text = text? text[0] : ''
  return text
}

export function getSettingsNode(tmpl) {
  let tag = getTag(tmpl)
  let settingsNode = {}
  if (tag) {
    settingsNode = {
      name: tag.name,
      attributes: tag.attributes,
      type: 'el',
      content: tag.content,
      typeTag: tag.type,
      indexEndInTmpl: tag.indexSlice
    } 
    if (tag.type === 'singleTag') {
      const singleEL = document.createElement(tag.name)
      setAttributes(singleEL, tag.attributes)
      settingsNode.el = singleEL
    }
  } else {
    let textContent = getText(tmpl);
    settingsNode = {
      type: 'text',
      content: textContent,
      indexEndInTmpl: textContent.length
    }
  }
  return settingsNode

}