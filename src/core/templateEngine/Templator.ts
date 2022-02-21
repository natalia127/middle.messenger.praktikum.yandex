import { getPropertyCtx, getTSettingsNode } from './utilsTemplator';
import {
  TSettingsNode, TSettingsTextNode, TTemplatorStruct,
  TCtx, TAttribute
} from './typeTemplator';
import { EDATA_PARAMS } from '../enumDataParams';
export const charSeparate = '##';

export class Templator {
  TEMPLATE_REGEXP = /\{\{([^}}].*?)\}\}/gi;

  private readonly _rawTemplate: string;

  private ctx: TCtx;

  private stackTreeEl: Array<TSettingsTextNode | TSettingsNode>;

  constructor(component: TTemplatorStruct) {
    this._rawTemplate = component.template;
    this.ctx = component.context;
    this.stackTreeEl = [];
  }

  compile(): HTMLElement {
    const tmpl: string = this.compileRawTmpl().replace(/\n/g, '');
    let result = this.getDomEl(tmpl);

    return result || document.createElement('div');
  }

  compileRawTmpl(): string {
    let tmpl: string = this.replaceOnCtxValue();
    tmpl = this.insertChildren(tmpl);
    return tmpl;
  }

  private replaceOnCtxValue() {
    const ctx: TCtx = this.ctx;
    let tmpl: string = this.replaceBlockIfElse();

    const regExp: RegExp = /\{\{(.*?)\}\}/gis;
    let key: RegExpExecArray| null = regExp.exec(tmpl);

    while (key) {
      const rawValue = key[1];
      const rawTemplateValue = key[0];
      if (rawValue) {
        const tmplValue: string = rawValue.trim();
        let data: unknown = getPropertyCtx(ctx, tmplValue);

        if (typeof data === 'number' || typeof data === 'boolean') {
          data = data.toString();
        }
        if (typeof data === 'string') {
          tmpl = tmpl.replace(new RegExp(rawTemplateValue, 'gi'), data);
          regExp.lastIndex = regExp.lastIndex - rawTemplateValue.length + data.length;
        }
      }
      key = regExp.exec(tmpl);
    }
    return tmpl;
  }

  replaceBlockIfElse() {
    // TODO дополнить блоками elseif
    const ctx = this.ctx;
    let tmpl: string = this._rawTemplate;
    const regExp: RegExp = /\{%\s*if\s*(.[^\s'",]+)\s*?%\}(.*?)((\{%\s*else\s*%\})(.*?))?(\{%\s*endif\s*%\})/gis;

    let key: RegExpExecArray | null = regExp.exec(tmpl);

    while (key) {
      const templBlockCondition = key[0];
      const condition = key[1];
      const resultIfTrue = key[2];
      const resultIfFalse = key[3] ? key[5] : '';

      if (Object.prototype.hasOwnProperty.call(ctx, condition)) {
        let valueReplace = ctx[condition] ? key[2] : '';
        if (ctx[condition]) {
          valueReplace = resultIfTrue;
        } else {
          valueReplace = resultIfFalse;
        }
        tmpl = tmpl.replace(templBlockCondition, valueReplace);
        regExp.lastIndex = regExp.lastIndex - templBlockCondition.length + valueReplace.length;
      }
      key = regExp.exec(tmpl);
    }
    return tmpl;
  }

  private getDomEl(rawStr: string) {
    const _rawStr = rawStr.trim().replace(/\n/g, '');

    let completeTreeEl = (tmpl: string = _rawStr, treeDepth: number = 0)=> {
      if (!tmpl) {
        this.consetrateEl(treeDepth);
        return;
      }
      let _tmpl: string = tmpl;
      const nodeStruct: TSettingsNode | TSettingsTextNode = getTSettingsNode(tmpl);
      this.stackTreeEl.push(nodeStruct);
      if (nodeStruct.typeEl === 'el' && nodeStruct.isChild) {
        nodeStruct.el = this.getMockChildren(nodeStruct);
      } else if (nodeStruct.typeEl === 'el' && nodeStruct.typeTag === 'singleTag') {
        nodeStruct.el = this.getNewElement(nodeStruct.name, nodeStruct.attributes);
      } else if (nodeStruct.typeEl === 'el' && nodeStruct.typeTag === 'fullTag') {
        completeTreeEl(nodeStruct.content);
      }
      if (nodeStruct.indexEndInTmpl) {
        _tmpl = _tmpl.slice(nodeStruct.indexEndInTmpl);
      }
      let _treeDepth = treeDepth + 1;
      completeTreeEl(_tmpl, _treeDepth);
    };
    completeTreeEl();
    let structEl = this.stackTreeEl[0] as TSettingsNode;
    return structEl.el;
  }

  private getNewElement(nameTag: string, attributes: TAttribute[]) : HTMLElement {
    const el = document.createElement(nameTag);
    this.setAttributes(el, attributes);
    return el;
  }

  private setAttributes(el: HTMLElement, attributes: TAttribute[]) {
    attributes.forEach((att => {
      if (att.key === 'class') {
        att.value.split(' ').filter(a => a).forEach((className => el.classList.add(className)));
      } else if (att.key.startsWith('@')) {
        const paramsEvents = el.getAttribute(EDATA_PARAMS.EVENTS) || '';
        el.setAttribute(EDATA_PARAMS.EVENTS, `${paramsEvents}${att.key.slice(1)}${charSeparate}${att.value};`);
      } else if (att.key.startsWith('::')) {
        const paramsProps = el.getAttribute(EDATA_PARAMS.PROPS) || '';
        let value = att.value;
        if (value.startsWith('%withContext#')) {
          const key = value.slice('%withContext#'.length);
          value = this.ctx[key];
          if (typeof value === 'function') {
            value = key;
          }
        }
        if (!value) {
          return;
        }
        el.setAttribute(EDATA_PARAMS.PROPS, `${paramsProps}${att.key.slice(2)}${charSeparate}${value};`);
      } else if (att.key === 't-if') {
        el.setAttribute(EDATA_PARAMS.CONDITION_IF, att.value);
      } else if (att.key === 't-else') {
        el.setAttribute(EDATA_PARAMS.CONDITION_ELSE, att.value);
      } else {
        el.setAttribute(att.key, att.value);
      }
    }));
  }

  private consetrateEl(treeDepth: number) {
    const structFirstEl = this.stackTreeEl[0] as TSettingsNode;
    if (this.stackTreeEl.length === 1 && structFirstEl.el) {
      return;
    }
    let nCurrentEl = this.stackTreeEl.length - 1 - treeDepth;
    const structEl = this.stackTreeEl[nCurrentEl] as TSettingsNode;

    const rootEl = this.getNewElement(structEl.name, structEl.attributes);
    for (nCurrentEl++; nCurrentEl < this.stackTreeEl.length; nCurrentEl++) {
      const currentEl = this.stackTreeEl[nCurrentEl];

      if (currentEl.typeEl === 'el' && currentEl.el instanceof HTMLElement) {
        rootEl.appendChild(currentEl.el);
      }
      if (currentEl.typeEl === 'text') {
        let textNode = document.createTextNode(this.stackTreeEl[nCurrentEl].content || '');
        rootEl.appendChild(textNode);
      }
    }
    this.stackTreeEl.splice(this.stackTreeEl.length - treeDepth, this.stackTreeEl.length - 1);
    const lastEl = this.stackTreeEl[this.stackTreeEl.length - 1] as TSettingsNode;
    lastEl.el = rootEl;
  }

  private getMockChildren(params: TSettingsNode): HTMLElement {
    params.attributes.push({
      key: EDATA_PARAMS.CHILD,
      value: params.name
    });
    return this.getNewElement('div', params.attributes);
  }

  private insertChildren(tmpl: string) {
    let _tmpl: string = tmpl;
    const regChildrenComponent: RegExp = /{%((\s*(\w+)\s*(context:\s*{(.*?)}\s*)?)+?)%}/gis;
    let key = regChildrenComponent.exec(_tmpl);
    while (key) {
      const nameComponent: string = key[3];
      const rawTemplateChild = key[0];
      const child = this.ctx[nameComponent.trim()];
      if (child && typeof child === 'string') {
        _tmpl = _tmpl.replace(rawTemplateChild, child);
        regChildrenComponent.lastIndex += (-rawTemplateChild.length + child.length);
      }

      key = regChildrenComponent.exec(_tmpl);
    }
    return _tmpl;
  }
}
