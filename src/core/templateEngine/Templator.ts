// TODO заменить магические цифры

import { getPropertyCtx, getTSettingsNode, setAttributes } from './utilsTemplator';
import {
  TSettingsNode, TSettingsTextNode, TTemplatorStruct,
  TCtx
} from './typeTemplator';

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
      if (rawValue) {
        const tmplValue: string = rawValue.trim();
        let data: unknown = getPropertyCtx(ctx, tmplValue);

        if (typeof data === 'number' || typeof data === 'boolean') {
          data = data.toString();
        }
        if (typeof data === 'string') {
          tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data);
          regExp.lastIndex = regExp.lastIndex - key[0].length + data.length;
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
      const value = key[1];
      if (Object.prototype.hasOwnProperty.call(ctx, value)) {
        let valueReplace = ctx[value] ? key[2] : '';
        if (ctx[value]) {
          valueReplace = key[2];
        } else if (key[3]) {
          valueReplace = key[5];
        } else {
          valueReplace = '';
        }
        tmpl = tmpl.replace(key[0], valueReplace);
        regExp.lastIndex = regExp.lastIndex - key[0].length + valueReplace.length;
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

      if (nodeStruct.typeEl === 'el' && nodeStruct.typeTag === 'fullTag') {
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

  private consetrateEl(treeDepth: number) {
    const structFirstEl = this.stackTreeEl[0] as TSettingsNode;
    if (this.stackTreeEl.length === 1 && structFirstEl.el) {
      return;
    }
    let nCurrentEl = this.stackTreeEl.length - 1 - treeDepth;
    const structEl = this.stackTreeEl[nCurrentEl] as TSettingsNode;
    const rootEl = document.createElement(structEl.name);
    setAttributes(rootEl, structEl.attributes);
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

  private insertChildren(tmpl: string) {
    let _tmpl: string = tmpl;
    const regChildrenComponent: RegExp = /{%((\s*(\w+)\s*(context:\s*{(.*?)}\s*)?)+?)%}/gis;
    let key = regChildrenComponent.exec(_tmpl);
    while (key) {
      const nameComponent: string = key[3];
      const child = this.ctx[nameComponent.trim()];
      if (child && typeof child === 'string') {
        _tmpl = _tmpl.replace(key[0], child);
        regChildrenComponent.lastIndex += (-key[0].length + child.length);
      }

      key = regChildrenComponent.exec(_tmpl);
    }
    return _tmpl;
  }
}
