import { EDATA_PARAMS } from '../enumDataParams';
export type TCtx = {
  [key: string]: any

}
export type TAttribute = {
  value: string,
  key: string
};

export type TInfoTag = {
  // eslint-disable-next-line no-undef
  name: string,
  attributes: TAttribute[]
};

export type TFullTInfoTag = TInfoTag & {
  indexEndInTmpl: number,
  content?: string,
  typeTag: 'fullTag' | 'singleTag',
  isChild: boolean
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
  context: TCtx
}

export type TDataMock = TAttribute[]
