import { Templator } from './templateEngine/Templator';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './EventBus';
import {
  eventsType, propsObject, childrenType, allPossibleProps, IBlock,
  propsAndChildren as propsAndChildrenType, eventsInnerType,
  listChildren
} from './typeBlock';
import { isEmptyObject } from '../utils/mydash';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

const NAME_ATT_DATA = 'data-t-id';
const NAME_ARRAY_DATA = 'data-a-id';

export abstract class Block implements IBlock {
  private element: DocumentFragment;

  private props: propsObject;

  private readonly eventBus: EventBus;

  private id: string;

  private content: HTMLElement | null;

  private children: childrenType;

  private events: eventsType;

  private innerEvents: eventsInnerType;

  private arrayProps: listChildren;

  constructor(propsAndChildren: propsAndChildrenType) {
    this.eventBus = new EventBus();
    const { children, props, arrayProps } = this.getChildren(propsAndChildren);
    this.children = children;
    this.props = this.makePropsProxy(props);
    this.arrayProps = arrayProps;
    this.registerEvents();
    this.id = `t${makeUUID()}`;
    this.eventBus.emit(EVENTS.INIT);
  }

  private getChildren(propsAndChildren: propsAndChildrenType): allPossibleProps {
    const children: childrenType = {};
    const props: propsObject = {};
    const arrayProps: listChildren = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && key !== 'innerEvents') {
        arrayProps[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, arrayProps };
  }

  private makePropsProxy(props: propsObject): propsObject {
    const self = this;
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value): boolean {
        self.removeEvents();
        const oldProps = { ...target };
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        self.eventBus.emit(EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  private registerEvents(): void {
    this.eventBus.on(EVENTS.INIT, this.init.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.createResources();
    this.eventBus.emit(EVENTS.FLOW_RENDER);
  }

  private createResources(): void {
    this.element = this.createDocumentFragment();
  }

  private createDocumentFragment(): DocumentFragment {
    const element: DocumentFragment = document.createDocumentFragment();

    return element;
  }

  dispatchComponentDidMount(): void {
    this.eventBus.emit(EVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.content = document.querySelector(`[${NAME_ATT_DATA}="${this.id}"]`);

    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  getId(): string {
    return this.id;
  }

  componentDidMount(): void {

  }

  setContent(content: HTMLElement | null): void {
    this.content = content;
  }

  private getChildMock() {
    const children: {[key: string]: string } = { };
    Object.entries(this.children).forEach(([key, child]) => {
      children[key] = `<div ${NAME_ATT_DATA}="${child.getId()}"></div>`;
    });
    return children;
  }

  private setContentChild(): void {
    Object.entries(this.children).forEach(([key, child]) => {
      const childContent: HTMLElement| null = document.querySelector(`[${NAME_ATT_DATA}="${child.getId()}"]`);
      if (childContent) {
        child.setContent(childContent);
      }
    });
  }

  private getArrayPropsMock(): {[key: string]: string } {
    const mockArrayProps: {[key: string]: string } = { };
    Object.entries(this.arrayProps).forEach(([key, prop], id) => {
      mockArrayProps[key] = `<div ${NAME_ARRAY_DATA}="${key}"></div>`;
    });

    return mockArrayProps;
  }

  private _render(): void {
    let template: string = this.render();

    const children: {[key: string]: string } = this.getChildMock();
    this.setContentChild();
    const arrayProps = this.getArrayPropsMock();
    const content = new Templator({
      template,
      context: { ...this.props, ...children, ...arrayProps }
    }).compile();

    content.setAttribute(NAME_ATT_DATA, this.id);
    this.replaceMockOnChild(content);
    this.replaceMockArray(content);
    this.element.appendChild(content);
    this.addEvents();
  }

  private replaceMockArray(content: HTMLElement) {
    if (isEmptyObject(this.arrayProps)) {
      return;
    }

    const els = content.querySelectorAll(`[${NAME_ARRAY_DATA}]`);

    Array.from(els).forEach(el =>{
      const key = el.getAttribute(NAME_ARRAY_DATA);
      if (key) {
        const items = this.arrayProps[key];
        const fragment = new DocumentFragment();
        items.forEach(item => {
          if (item instanceof Block) {
            fragment.appendChild(item.getContent());
          } // TODO сделать цикл не только для детей
        });
        el.replaceWith(fragment);
      }
    });
  }

  private replaceMockOnChild(content: HTMLElement) {
    Object.values(this.children).forEach(child => {
      const stub: HTMLElement | null = content.querySelector(`[${NAME_ATT_DATA}="${child.getId()}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
        // @ts-ignore: Unreachable code error
        child.setContent(null);
      }
    });
  }

  protected abstract render(): string;

  getContent(): HTMLElement | DocumentFragment {
    if (this.content) {
      return this.content;
    }
    return this.element;
  }

  private addEvents(): void {
    this.addRootEvents();
    this.addInnerEvents();
  }

  private addRootEvents(): void {
    let events: eventsType | undefined = this.props.events;
    if (events) {
      this.events = Object.keys(events).reduce((acc: eventsType, nameAttached: string) => {
        if (events) {
          acc[nameAttached] = events[nameAttached].bind(this);
        }
        return acc;
      }, {});
      Object.keys(this.events).forEach((eventName: string) => {
        // @ts-ignore: Unreachable code error
        this.element.firstChild.addEventListener(eventName, this.events[eventName]);
      });
    }
  }

  private addInnerEvents(): void {
    if (!this.props.innerEvents) {
      return;
    }
    let events: eventsInnerType = this.props.innerEvents;

    this.innerEvents = events;
    this.innerEvents.forEach(eventSetings => {
      if (this.element && this.element.firstChild) {
        const el = this.element.firstChild as HTMLElement;
        const target = el.querySelector(`${eventSetings.selector}`);
        Object.keys(eventSetings).forEach((prop: string) => {
          if (typeof eventSetings[prop] === 'function' && target) {
            // @ts-ignore: Unreachable code error
            // eslint-disable-next-line no-param-reassign
            eventSetings[prop] = eventSetings[prop].bind(this);
            // @ts-ignore: Unreachable code error
            target.addEventListener(prop, eventSetings[prop]);
          }
        });
      }
    });
  }

  private removeEvents(): void {
    if (this.events) {
      Object.keys(this.events).forEach((eventName: string) => {
        // @ts-ignore: Unreachable code error
        this.content.removeEventListener(eventName, this.events[eventName]);
      });
    }
    if (this.innerEvents) {
      this.innerEvents.forEach(eventSetings => {
        if (this.content) {
          const target = this.content.querySelector(eventSetings.selector);
          Object.keys(eventSetings).forEach((prop: string) => {
            if (prop !== 'selector') {
              // @ts-ignore: Unreachable code error
              target.removeEventListener(prop, eventSetings[prop]);
            }
          });
        }
      });
    }
  }

  private _componentDidUpdate(oldProps: propsObject, newProps: propsObject): void {
    const response: boolean = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
    const replaceEl: HTMLElement | null = document.querySelector(`[data-t-id=${this.id}]`);
    if (replaceEl && this.element.firstChild) {
      replaceEl.replaceWith(this.element.firstChild);
    }
  }

  /* eslint no-unused-vars: ["error", { "args": "none" }] */
  protected componentDidUpdate(oldProps: propsObject, newProps: propsObject): boolean {
    return true;
  }

  setProps(nextProps: propsObject): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  show(): void {
    if (this.content instanceof HTMLElement) {
      this.content.style.display = 'block';
    }
  }

  hide(): void {
    if (this.content instanceof HTMLElement) {
      this.content.style.display = 'none';
    }
  }
}
