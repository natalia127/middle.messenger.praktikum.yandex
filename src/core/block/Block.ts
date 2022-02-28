import { Templator } from '../templateEngine/Templator';
import { v4 as makeUUID } from 'uuid';
import { EventBus } from '../EventBus';
import { TDataMock, TAttribute } from '../templateEngine/typeTemplator';
import {
  TEvents, TPropsObject, TChildren, IBlock,
  TMethods,
  TInfo,
  TComponents
} from './typeBlock';
import { markChildInTemplate } from '../templateEngine/utilsTemplator';
import { EDATA_PARAMS } from '../enumDataParams';
import {
  zipStr, isEqual,
  getObjIntersection
} from '../utils/mydash';
import { getElsForAttribute } from '../utils/dom';
import { parseDataMock, getParametrsWithMock, getPropsWithMock } from './utilsBlock';

enum EEVENTS {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_CDR = 'flow:component-did-delete',
  FLOW_RENDER = 'flow:render',
  FLOW_CBR = 'flow:component-before-render',
  FLOW_RU = 'flow:component-ready-to-use'
}
// type TValueEvents = Values<typeof EEVENTS>

export abstract class Block implements IBlock {
  private element: DocumentFragment;

  props: TPropsObject;

  private readonly eventBus: EventBus;

  private id: string;

  private content: Element | null;

  children: TChildren = {};

  private events: TEvents = [];

  methods: TMethods;

  private innerComponents: TComponents;

  private zipTemplate: string;

  constructor(info: TInfo = {
    methods: {},
    data: {},
    components: {}
  }) {
    this.eventBus = new EventBus();
    const props = info.data || {};
    this.methods = info.methods || {};
    this.innerComponents = info.components || {};
    this.props = this.makePropsProxy(props);
    this.bindMethods();
    this.registerEvents();
    this.id = `t${makeUUID()}`;
    this.eventBus.emit(EEVENTS.INIT);
  }

  private bindMethods() {
    if (!this.methods) {
      return;
    }
    Object.entries(this.methods).forEach(([key, handler]) => {
      if (this.methods) {
        this.methods[key] = handler.bind(this);
      }
    });
  }

  private makePropsProxy(props: TPropsObject): TPropsObject {
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
        self.eventBus.emit(EEVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  private registerEvents(): void {
    this.eventBus.on(EEVENTS.INIT, this.init.bind(this));
    this.eventBus.on(EEVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(EEVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(EEVENTS.FLOW_RENDER, this._render.bind(this));
    this.eventBus.on(EEVENTS.FLOW_CDR, this._componentDidRemove.bind(this));
    this.eventBus.on(EEVENTS.FLOW_CBR, this._componentBeforeRendering.bind(this));
    this.eventBus.on(EEVENTS.FLOW_RU, this._componentReadyUse.bind(this));
  }

  init(): void {
    this.eventBus.emit(EEVENTS.FLOW_CBR);

    this.createResources();
    this.eventBus.emit(EEVENTS.FLOW_RENDER);
  }

  private _componentBeforeRendering() {
    this.componentBeforeRendering();
  }

  private _componentReadyUse() {
    this.componentReadyUse();
  }

  componentReadyUse() {

  }

  componentBeforeRendering() {

  }

  private createResources(): void {
    this.element = this.createDocumentFragment();
  }

  private createDocumentFragment(): DocumentFragment {
    const element: DocumentFragment = document.createDocumentFragment();

    return element;
  }

  dispatchComponentDidMount(): void {
    this.eventBus.emit(EEVENTS.FLOW_CDM);
  }

  private _componentDidMount(): void {
    this.content = document.querySelector(`[${EDATA_PARAMS.BLOCK_ID}="${this.id}"]`);

    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  private _componentDidRemove(): void {

  }

  getId(): string {
    return this.id;
  }

  componentDidMount(): void {

  }

  setContent(content: Element | null): void {
    this.content = content;
  }

  private _render(): void {
    let template: string = this.render();

    if (!this.zipTemplate) {
      this.setZipTemplate(template);
    }

    if (this.needUpdateChild(template)) {
      this.clearCachWithChild();
      this.setZipTemplate(template);
    }
    template = markChildInTemplate(template);

    const content = new Templator({
      template,
      context: {
        ...this.props,
        ...this.methods
      }
    }).compile();

    content.setAttribute(EDATA_PARAMS.BLOCK_ID, this.id);
    this.replaceMock(content);

    this.element.appendChild(content);

    this.setContent(content);
    process.nextTick(()=> {
      this.eventBus.emit(EEVENTS.FLOW_RU);
    });
  }

  private replaceMock(content: Element) {
    this.replaceMockCondition(content);
    this.replaceMockOnChild(content);
    this.replaceMockEvents(content);
    this.replaceMockProps(content);
  }

  private replaceMockCondition(content: Element) {
    const allElWithIf = getElsForAttribute(content, EDATA_PARAMS.CONDITION_IF);
    allElWithIf.forEach((el: Element) => {
      const condition = el.getAttribute(EDATA_PARAMS.CONDITION_IF);
      if (!condition) {
        return;
      }

      let valueCondition = this.props[condition] || this.methods[condition];
      const callbackIf = (result: boolean)=>{
        if (result) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      };

      callbackIf(!!valueCondition);

      if (typeof valueCondition === 'function') {
        this.wrapMethod(condition, callbackIf);
      }

      const nextSibling = el.nextElementSibling;

      const callbackElse = (result: boolean)=>{
        if (!nextSibling) {
          return;
        }
        if (result) {
          nextSibling.classList.add('hidden');
        } else {
          nextSibling.classList.remove('hidden');
        }
      };
      if (nextSibling?.hasAttribute(EDATA_PARAMS.CONDITION_ELSE)) {
        callbackElse(!!valueCondition);
        if (typeof valueCondition === 'function') {
          this.wrapMethod(condition, callbackElse);
        }
        nextSibling.removeAttribute(EDATA_PARAMS.CONDITION_ELSE);
      }

      el.removeAttribute(EDATA_PARAMS.CONDITION_IF);
    });
  }

  private wrapMethod(nameMethod: string, callBack: Function) {
    let f: Function;
    console.log(this.methods[nameMethod].name);

    if (this.methods[nameMethod].name === 'wrapMethod') {
      f = this.methods[`initial${nameMethod}`];
    } else {
      f = this.methods[nameMethod];
      this.methods[`initial${nameMethod}`] = this.methods[nameMethod];
    }

    this.methods[nameMethod] = function wrapMethod() {
      let result = f();
      console.log(f);
      console.log(f.name);

      console.log(result);

      callBack(result);
      return true;
    };
  }

  private replaceMockProps(content: Element) {
    const allElWithProps = getElsForAttribute(content, EDATA_PARAMS.PROPS);

    allElWithProps.forEach((el: Element)=>{
      const propsChild = getPropsWithMock(el);

      Object.entries(propsChild).forEach(([key, value]: [string, string]) => {
        let valueAttr = this.props[value] || this.methods[value];

        if (typeof valueAttr === 'function') {
          let callback = (result: string)=>{
            el.setAttribute(key, result);
          };
          this.wrapMethod(value, callback);
          this.methods[value]();
        } else
        if (valueAttr) {
          el.setAttribute(key, valueAttr);
        }
      });
    });
  }

  private replaceMockOnChild(content: Element) {
    const stubsChildren = getElsForAttribute(content, EDATA_PARAMS.CHILD);

    stubsChildren.forEach((stubChild: Element) => {
      const {
        nameChild, nChild, paramsEvents, propsChild
      } = getParametrsWithMock(stubChild);

      if (!nChild || !nameChild || (nameChild && !this.innerComponents[nameChild])) {
        return;
      }

      let child: IBlock;

      if (this.children[nChild]) {
        const needPropsChild = getObjIntersection(this.children[nChild].props, propsChild);

        if (!isEqual(needPropsChild, this.children[nChild].props)) {
          this.children[nChild].setProps(propsChild);
          this.children[nChild].forseContent();
        }

        child = this.children[nChild];
      } else {
        child = new this.innerComponents[nameChild](propsChild);
        this.children[nChild] = child;
        if (paramsEvents) {
          child.setEvents(child.getContent() as Element, paramsEvents);
        }
      }

      this.replaceWith(stubChild, child, content);
    });
  }

  private replaceWith(stub: Element, block: IBlock, shellContent: Element) {
    stub.replaceWith(block.getContent());
  }

  setEvents(el: Element, paramsEvents: TDataMock) {
    paramsEvents.forEach((paramEvent)=>{
      const { key: nameEvent, value: nameHandler } = paramEvent;
      const handler = this.methods[nameHandler];

      if (handler) {
        this.events.push({ el, nameEvent, nameHandler });
        el.addEventListener(nameEvent, handler as (e: Event) => void);
      }
    });
  }

  private replaceMockEvents(el: Element) {
    const elsWithEvent = getElsForAttribute(el, EDATA_PARAMS.EVENTS);

    elsWithEvent.forEach((_el: Element)=> {
      const paramsEvents = parseDataMock(_el as Element, EDATA_PARAMS.EVENTS);
      if (!paramsEvents) {
        return;
      }
      paramsEvents.forEach((paramEvent: TAttribute)=>{
        const { key: nameEvent, value: nameHandler } = paramEvent;
        const handler = this.methods[nameHandler];

        if (handler) {
          this.events.push({ el: _el, nameEvent, nameHandler });
          _el.addEventListener(nameEvent, handler as (e: Event) => void);
        }
      });
    });
  }

  protected abstract render(): string;

  getContent(): Element | DocumentFragment {
    if (this.content) {
      return this.content;
    }
    return this.element;
  }

  private removeEvents(): void {
    this.events.forEach(paramsEvent => {
      paramsEvent.el.removeEventListener(
        paramsEvent.nameEvent,
        this.methods[paramsEvent.nameHandler] as (e: Event)=> void
      );
    });
  }

  private _componentDidUpdate(oldProps: TPropsObject, newProps: TPropsObject): void {
    const response: boolean = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
    const replaceEl: Element | null = document.querySelector(`[data-t-id=${this.id}]`);
    if (replaceEl && this.element.firstChild) {
      replaceEl.replaceWith(this.element.firstChild);
    }
  }

  /* eslint no-unused-vars: ["error", { "args": "none" }] */
  protected componentDidUpdate(oldProps: TPropsObject, newProps: TPropsObject): boolean {
    return true;
  }

  setProps(nextProps: TPropsObject): void {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  show(): void {
    const content = this.getContent();

    if (content instanceof Element) {
      content.classList.remove('hidden');
    }
  }

  hide(): void {
    const content = this.getContent();

    if (content instanceof Element) {
      content.classList.add('hidden');
    }
  }

  private setZipTemplate(template: string) {
    this.zipTemplate = zipStr(template);
  }

  private needUpdateChild(template: string) {
    return this.zipTemplate !== zipStr(template);
  }

  private clearCachWithChild() {
    this.children = {};
  }

  forseContent() {
    this._render();
  }
}
