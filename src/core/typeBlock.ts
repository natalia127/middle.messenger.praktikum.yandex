export type TEvents = { [key: string]: Function }
export type TEventsInner =
{ [key: string]: Function | string,
  selector: string }[];

export type TPropsObject = {
  [key: string]: boolean | number | string| null | Function| object| undefined,
  events?: TEvents,
  innerEvents?: TEventsInner
}
export interface IBlock {
  init(): void,
  dispatchComponentDidMount(): void,
  componentDidMount(): void,
  // eslint-disable-next-line no-unused-vars
  setContent(content: HTMLElement): void,
  getContent(): HTMLElement | DocumentFragment,
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
export type TPropsAndChildren = TPropsObject | TChildren;
