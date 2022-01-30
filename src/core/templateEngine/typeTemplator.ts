export type TCtx = {[key: string]: boolean | number | string| null| undefined }

export type attribute = {
  value: string,
  key: string
};

export type TInfoTag = {
  // eslint-disable-next-line no-undef
  name: string,
  attributes: attribute[]
};

export type TFullTInfoTag = TInfoTag & {
  indexEndInTmpl: number,
  content?: string,
  typeTag: 'fullTag' | 'singleTag'
};

export type TSettingsNode = TFullTInfoTag & {
  typeEl: 'el',
  el: HTMLElement | null,
};
export type TSettingsTextNode = {
  typeEl: 'text',
  content: string,
  indexEndInTmpl: number
};

export type TTemplatorStruct = {
  template: string,
  context: TCtx,
  children: TTemplatorStruct,
}
