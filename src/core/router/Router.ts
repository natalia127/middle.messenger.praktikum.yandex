import { Route } from './Route';
import { IRoute } from './typeRouting';
import {
  Constructable, IBlock
} from '../../core/block/typeBlock';
export class Router {
  routes: IRoute[];

  history: History;

  private currentRoute: IRoute;

  private callbackDidTransition: Function;

  private rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this.rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: Constructable<IBlock>) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = event => {
      if (!event.currentTarget) {
        return;
      }
      const pathname = event.currentTarget.location.pathname;
      const response: boolean = this.routerDidTransition(pathname);
      if (!response) {
        return;
      }
      this.onRoute(pathname);
    };
    const response: boolean = this.routerDidTransition(window.location.pathname);
    if (!response) {
      return;
    }
    this.onRoute(window.location.pathname);
  }

  private onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }
    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    const response: boolean = this.routerDidTransition(pathname);
    if (!response) {
      return;
    }
    this.history.pushState({}, '', pathname);
    this.onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find(route => route.match(pathname));
  }

  getCurrentPath() {
    const result = this.currentRoute ? this.currentRoute.getPathname() : window.location.pathname;
    return result;
  }

  setCallbackDidTransition(callbackDidTransition: Function) {
    this.callbackDidTransition = callbackDidTransition;
  }

  routerDidTransition(pathname: string): boolean {
    if (this.callbackDidTransition) {
      return this.callbackDidTransition(pathname);
    }
    return true;
  }
}
