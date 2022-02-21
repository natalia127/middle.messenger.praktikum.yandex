import { isEqualString } from '../utils/mydash';
import { render } from '../utils/renderDOM';
import {
  Constructable, IBlock
} from '../../core/typeBlock';
import { IRoute } from './typeRouting';
export class Route implements IRoute {
  private pathname: string;

  private BlockClass: Constructable<IBlock>;

  private block: IBlock;

  private props: {[key: string]: any};

  constructor(pathname: string, view: Constructable<IBlock>, props: {[key: string]: any}) {
    this.pathname = pathname;
    this.BlockClass = view;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.hide();
    }
  }

  match(pathname: string) {
    return isEqualString(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass();

      render(this.props.rootQuery, this.block);
      return;
    }

    this.block.show();
  }

  getPathname() {
    return this.pathname;
  }
}
