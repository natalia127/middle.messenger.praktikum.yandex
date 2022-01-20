export type eventsType = { [key: string]: Function }

export type propsObject = {
  [key: string]: boolean | number | string| null |undefined| Function| object,
  events?: eventsType
}

export interface IBlock {
  init(): void,
  dispatchComponentDidMount(): void,
  componentDidMount(): void,
  setContent(content: HTMLElement): void,
  getContent(): HTMLElement | DocumentFragment,
  setProps(nextProps: propsObject): void,
  show(): void,
  hide(): void,
  getId(): string
}

export type childrenType = {
  [key: string]: IBlock
}
export type separatedPropsChild = {
  children: childrenType,
  props: propsObject
}
export type propsAndChildren = propsObject | childrenType;
