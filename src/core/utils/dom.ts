export const createEl = (nameTag: string, attributes: {key: string, value: string}[]) =>{
  const el = document.createElement(nameTag);
  attributes.forEach((att => {
    el.setAttribute(att.key, att.value);
  }));
  return el;
};

export const getElsForAttribute = (el: Element, nameAttribute: string) => {
  const result = Array.from(el.querySelectorAll(`[${nameAttribute}]`));
  if (el.hasAttribute(nameAttribute)) {
    result.push(el);
  }

  return result;
};
