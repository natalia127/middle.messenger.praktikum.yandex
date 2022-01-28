export type ctxType = {[key: string]: boolean | number | string| null| undefined }

export type attribute = {
  value: string,
  key: string
};

export type infoTag = {
  // eslint-disable-next-line no-undef
  name: string,
  attributes: attribute[]
};

export type fullInfoTag = infoTag & {
  indexEndInTmpl: number,
  content?: string,
  typeTag: 'fullTag' | 'singleTag'
};

export type settingsNode = fullInfoTag & {
  typeEl: 'el',
  el: HTMLElement | null,
};
export type settingsTextNode = {
  typeEl: 'text',
  content: string,
  indexEndInTmpl: number
};

export type TemplatorStruct = {
  template: string,
  context: ctxType,
  children: TemplatorStruct,
}
