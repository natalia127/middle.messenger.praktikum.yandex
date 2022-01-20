import { EventBus } from './EventBus';
import { Templator } from './templateEngine/Templator';
import { v4 as makeUUID } from 'uuid';

export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private _element = null;

  protected eventBus: Function;

  props: object;

  private id: string = null;

  constructor(propsAndChildren: object = {}) {
    const eventBus: EventBus = new EventBus();
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = children;

    this.props = this.makePropsProxy(props);
    this.id = makeUUID();
    this.props = this.makePropsProxy({ ...props, __id: this.id });

    this.eventBus = (): EventBus => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private createResources() {
    this._element = this.createDocumentElement('div');
  }

  private getChildren(propsAndChildren = {}) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  compile(template, propsAndChildren): HTMLElement {
    const { children, props } = this.getChildren(propsAndChildren);
    this.children = { ...this.children, ...children };
    this.props = { ...this.props, ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      this.props[key] = `<div data-id="${child.id}"></div>`;
    });

    const tmpl = new Templator({
      template,
      context: this.props
    });
    const fragment = this.createDocumentFragment();
    fragment.appendChild(tmpl.compile());
    Object.values(this.children).forEach(child => {
      const stub = fragment.querySelector(`[data-id="${child.id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment;
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  protected componentDidMount(): void {

  }

  private _componentDidUpdate(oldProps: object, newProps: object) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this._render();
  }

  protected componentDidUpdate?(oldProps: object, newProps: object): boolean {
    return true;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public get element(): HTMLElement {
    return this._element;
  }

  private _render() {
    let template = this.render();
    if (typeof template === 'string') {
      template = this.compile(template);

      // const tmpl = new Templator({
      //   template,
      //   context: this.props
      // });
      // template = tmpl.compile();
    }

    this._element.innerHtml = '';
    this._element.appendChild(template);

    this.addEvents();
  }

  protected abstract render(): string | HTMLElement;

  getContent() {
    return this._element;
  }

  private addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach(eventName => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  private makePropsProxy(props: object): object {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value): boolean {
        let targetNew = { ...target };
        targetNew[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  private createDocumentElement(tag: string): DocumentFragment {
    const element = document.createElement(tag);
    if (this.props?.settings?.withInternalID) {
      element.setAttribute('data-id', this.id);
    }
    return element;
  }

  private createDocumentFragment(): DocumentFragment {
    const element = document.createDocumentFragment();
    return element;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
