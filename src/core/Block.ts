import { Templator } from './templateEngine/Templator';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from './EventBus';
import {
  eventsType, propsObject, childrenType, separatedPropsChild, IBlock,
  propsAndChildren as propsAndChildrenType
} from './typeBlock';

enum EVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render'
}

const NAME_ATT_DATA = 'data-t-id';

export abstract class Block implements IBlock {
  private element: DocumentFragment;

  private props: propsObject;

  private readonly eventBus: EventBus;

  private id: string;

  private content: HTMLElement | null;

  private children: childrenType;

  private events: eventsType;

  constructor(propsAndChildren: propsAndChildrenType) {
    this.eventBus = new EventBus();
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;
    this.props = this.makePropsProxy(props);
    this.registerEvents();
    this.id = `t${makeUUID()}`;
    this.eventBus.emit(EVENTS.INIT);
  }

  private getChildren(propsAndChildren: propsAndChildrenType): separatedPropsChild {
    const children: childrenType = {};
    const props: propsObject = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
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

  private _render(): void {
    let template: string = this.render();

    const children: {[key: string]: string } = { };
    Object.entries(this.children).forEach(([key, child]) => {
      children[key] = `<div ${NAME_ATT_DATA}="${child.getId()}"></div>`;
      const childContent: HTMLElement| null = document.querySelector(`[${NAME_ATT_DATA}="${child.getId()}"]`);
      if (childContent) {
        child.setContent(childContent);
      }
    });

    const content = new Templator({
      template,
      context: { ...this.props, ...children }
    }).compile();

    content.setAttribute(NAME_ATT_DATA, this.id);

    Object.values(this.children).forEach(child => {
      const stub: HTMLElement | null = content.querySelector(`[${NAME_ATT_DATA}="${child.getId()}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
        child.setContent(null);
      }
    });

    this.element.appendChild(content);
    this.addEvents();
  }

  protected abstract render(): string;

  getContent(): HTMLElement | DocumentFragment {
    if (this.content) {
      return this.content;
    }
    return this.element;
  }

  private addEvents(): void {
    let events: eventsType | null = null;
    if (this.props.events) {
      events = this.props.events;
    }
    if (!events) { return; }
    this.events = { ...events };

    Object.keys(this.events).forEach((eventName: string) => {
      // @ts-ignore: Unreachable code error
      this.element.firstChild.addEventListener(eventName, this.events[eventName]);
    });
  }

  private removeEvents(): void {
    Object.keys(this.events).forEach((eventName: string) => {
      // @ts-ignore: Unreachable code error
      this.content.removeEventListener(eventName, this.events[eventName]);
    });
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
