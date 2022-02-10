interface Constructable<T> {
  new(...args: any) : T;
}
export type TMethods = {
  [key: string]: Function
}

export type TEvents = {
  el: Element,
  nameEvent: string,
  nameHandler: string
}[]
export type TEventsInner =
{ [key: string]: Function | string,
  selector: string }[];

export type TPropsObject = {
  [key: string]: boolean | number | string| null | Function| object| undefined,
}
export interface IBlock {
  init(): void,
  dispatchComponentDidMount(): void,
  componentDidMount(): void,
  // eslint-disable-next-line no-unused-vars
  setContent(content: Element): void,
  getContent(): Element | DocumentFragment,
  // eslint-disable-next-line no-unused-vars
  setProps(nextProps: TPropsObject): void,
  show(): void,
  hide(): void,
  getId(): string
}

export type TChildren = {
  [key: string]: IBlock
}

export type TListChildren = {
  [key: string]: IBlock[]
}

export type allPossibleProps = {
  children: TChildren,
  props: TPropsObject,
  arrayProps: TListChildren
}

export type TComponents = {
  [key: string]: Constructable<IBlock>
}

export type TInfo = {
  methods?: TMethods,
  data?: TPropsObject,
  components?: TComponents
}
