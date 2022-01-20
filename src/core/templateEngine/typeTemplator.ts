export type attribute = {
  value: string,
  key: string
};

export type infoTag = {
  name: null | string,
  attributes: attribute[]
};

export type fullInfoTag = infoTag & {
  indexEndInTmpl: number,
  content?: string,
  typeTag: 'fullTag' | 'singleTag'
};

export type settingsNode = fullInfoTag & {
  typeEl: 'el',
  el: HTMLElement,
};
export type settingsTextNode = {
  typeEl: 'text',
  content: string,
  indexEndInTmpl: number
};

export type TemplatorStruct = {
  template: string,
  context: object,
  children: TemplatorStruct,
  setContext?: Function
}
