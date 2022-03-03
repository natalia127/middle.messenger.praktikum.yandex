export interface IRoute {
  // eslint-disable-next-line no-unused-vars
  navigate(pathname: string): void,
  leave(): void,
  // eslint-disable-next-line no-unused-vars
  match(pathname: string): boolean,
  render(): void,
  getPathname(): string
}
