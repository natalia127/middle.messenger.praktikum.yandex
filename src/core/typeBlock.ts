export type eventsType = { [key: string]: Function }
export type eventsInnerType =
{ [key: string]: Function | string,
  selector: string }[];

export type propsObject = {
  [key: string]: boolean | number | string| null | Function| object| undefined,
  events?: eventsType,
  innerEvents?: eventsInnerType
}
export interface IBlock {
  init(): void,
  dispatchComponentDidMount(): void,
  componentDidMount(): void,
  // eslint-disable-next-line no-unused-vars
  setContent(content: HTMLElement): void,
  getContent(): HTMLElement | DocumentFragment,
  // eslint-disable-next-line no-unused-vars
  setProps(nextProps: propsObject): void,
  show(): void,
  hide(): void,
  getId(): string
}

export type childrenType = {
  [key: string]: IBlock
}

export type listChildren = {
  [key: string]: IBlock[]
}

export type allPossibleProps = {
  children: childrenType,
  props: propsObject,
  arrayProps: listChildren
}
export type propsAndChildren = propsObject | childrenType;
