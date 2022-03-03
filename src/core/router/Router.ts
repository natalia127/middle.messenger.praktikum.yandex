import { Route } from './Route';
import { IRoute, IRouter } from './typeRouting';
import {
  Constructable, IBlock
} from '../../core/block/typeBlock';
import { EventBus } from '../EventBus';

export enum EROUTER_EVENTS {
  FLOW_BT = 'flow:before-transition'
}
export class Router extends EventBus implements IRouter {
  routes: IRoute[];

  private errorRoutes: IRoute;

  history: History;

  private currentRoute: IRoute;

  private callbackDidTransition: Function;

  private rootQuery: string;

  static __instance: any;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }
    super();
    this.routes = [];
    this.history = window.history;
    this.rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: Constructable<IBlock>, isErrorRoutess: boolean = false) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });
    if (isErrorRoutess) {
      this.errorRoutes = route;
    } else {
      this.routes.push(route);
    }
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (!event.currentTarget) {
        return;
      }
      const pathname = (event.currentTarget as Document).location.pathname;
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
    const route = this.getRoute(pathname) || this.errorRoutes;

    if (!route) {
      return;
    }

    this.routes.forEach(r => r.leave());

    this.currentRoute = route;

    route.render();
    this.emit(EROUTER_EVENTS.FLOW_BT);
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
