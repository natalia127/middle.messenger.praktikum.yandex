import {
  Constructable, IBlock
} from '../../core/block/typeBlock';
export interface IRoute {
  // eslint-disable-next-line no-unused-vars
  navigate(pathname: string): void,
  leave(): void,
  // eslint-disable-next-line no-unused-vars
  match(pathname: string): boolean,
  render(): void,
  getPathname(): string
}

export interface IRouter {
  routes: IRoute[],
  history: History,
  // eslint-disable-next-line no-unused-vars
  use(pathname: string, block: Constructable<IBlock>, isErrorRoutess: boolean): void,
  // eslint-disable-next-line no-unused-vars
  go(pathname: string): void
}
