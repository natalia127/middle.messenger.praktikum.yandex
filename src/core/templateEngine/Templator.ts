// TODO отрефакторить , + сделать циклы

import { getPropertyCtx, getSettingsNode, setAttributes } from './utilsTemplator';
import {
  settingsNode, settingsTextNode, TemplatorStruct
} from './typeTemplator';

export class Templator<T> {
  TEMPLATE_REGEXP = /\{\{([^}}].*?)\}\}/gi;

  private readonly _rawTemplate: string;

  private ctx: T;

  private children: TemplatorStruct;

  private stackTreeEl: Array<settingsTextNode | settingsNode>;

  constructor(component) {
    this._rawTemplate = component.template;
    this.ctx = component.context;
    this.stackTreeEl = [];
    this.children = component.children;
  }

  compile(): HTMLElement {
    const tmpl: string = this.compileRawTmpl().replace(/\n/g, '');
    return this._getDomEl(tmpl);
  }

  compileRawTmpl(): string {
    let tmpl: string = this._replaceOnCtxValue();
    tmpl = this._insertChildren(tmpl);
    return tmpl;
  }

  // _insertChildren(tmpl: string): string {
  //   if (!this.children) return tmpl;
  //   let _tmpl: string = tmpl;
  //   const regChildrenComponent: RegExp = /{%((\s*(\w+)\s*(context:\s*{(.*?)}\s*)?)+?)%}/gis;

  //   let key: RegExpExecArray = regChildrenComponent.exec(_tmpl);

  //   while (key) {
  //     const nameComponent: string = key[3];
  //     const rawContext: string = key[5];
  //     const childrenComponent: TemplatorStruct = this.children[nameComponent.trim()];
  //     if (childrenComponent) {
  //       if (rawContext) {
  //         this._setContextChildren(childrenComponent, rawContext);
  //       }
  //       const templator: Templator<T> = new Templator(childrenComponent);
  //       let tmplChildren: string = templator.compileRawTmpl();
  //       _tmpl = _tmpl.replace(key[0], tmplChildren);
  //       regChildrenComponent.lastIndex = tmplChildren.length - key[0].length;
  //     }

  //     key = regChildrenComponent.exec(_tmpl);
  //   }
  //   return _tmpl;
  // }

  // _setContextChildren(children: TemplatorStruct, rawContext: string) {
  //   const regPropertyCtx: RegExp = /(\w+)\s*:\s(('|")(.+)('|")|.[^\s'",]+)/g;
  //   let key: RegExpExecArray = regPropertyCtx.exec(rawContext);
  //   while (key) {
  //     const keyCtx: string = key[1];
  //     let valueCtx: string = key[4];

  //     if (!valueCtx) {
  //       valueCtx = this.ctx[key[2]];
  //     }
  //     children.setContext({
  //       [keyCtx]: valueCtx
  //     });
  //     key = regPropertyCtx.exec(rawContext);
  //   }
  // }

  _replaceOnCtxValue() {
    const ctx: T = this.ctx;
    let tmpl: string = this._replaceBlockIfElse();

    const regExp: RegExp = /\{\{(.*?)\}\}/gis;
    let key: RegExpExecArray = regExp.exec(tmpl);

    while (key) {
      if (key[1]) {
        const tmplValue: string = key[1].trim();
        let data: unknown = getPropertyCtx(ctx, tmplValue);

        // if (typeof data === 'function') {
        //   window[tmplValue] = data;
        //   tmpl = tmpl.replace(
        //     new RegExp(key[0], 'gi'),
        //     `window.${key[1].trim()}()`
        //   );
        // } else
        if (typeof data !== 'string') {
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

  _replaceBlockIfElse() {
    // TODO дополнить блоками elseif
    const ctx: T = this.ctx;
    let tmpl: string = this._rawTemplate;
    const regExp: RegExp = /\{%\s*if\s*(.[^\s'",]+)\s*?%\}(.*?)((\{%\s*else\s*%\})(.*?))?(\{%\s*endif\s*%\})/gis;

    let key: RegExpExecArray = regExp.exec(tmpl);

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

  _getDomEl(rawStr: string) {
    const _rawStr = rawStr.trim().replace(/\n/g, '');

    let completeTreeEl = (tmpl: string = _rawStr, treeDepth: number = 0)=> {
      if (!tmpl) {
        this._consetrateEl(treeDepth);
        return;
      }
      let _tmpl: string = tmpl;
      const nodeStruct: settingsNode | settingsTextNode = getSettingsNode(tmpl);
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

    return this.stackTreeEl[0].el;
  }

  _consetrateEl(treeDepth) {
    if (this.stackTreeEl.length === 1 && this.stackTreeEl[0].el) {
      return;
    }
    let nCurrentEl = this.stackTreeEl.length - 1 - treeDepth;
    const rootEl = document.createElement(this.stackTreeEl[nCurrentEl].name);
    setAttributes(rootEl, this.stackTreeEl[nCurrentEl].attributes);
    for (nCurrentEl++; nCurrentEl < this.stackTreeEl.length; nCurrentEl++) {
      const currentEl = this.stackTreeEl[nCurrentEl];

      if (currentEl.typeEl === 'el') {
        rootEl.appendChild(currentEl.el);
      }
      if (currentEl.typeEl === 'text') {
        // this._searchChildreninTmpl(this.stackTreeEl[nCurrentEl].content);
        let textNode = document.createTextNode(this.stackTreeEl[nCurrentEl].content);
        rootEl.appendChild(textNode);
      }
    }
    this.stackTreeEl.splice(this.stackTreeEl.length - treeDepth, this.stackTreeEl.length - 1);
    this.stackTreeEl[this.stackTreeEl.length - 1].el = rootEl;
  }

  _insertChildren(tmpl) {
    let _tmpl: string = tmpl;
    const regChildrenComponent: RegExp = /{%((\s*(\w+)\s*(context:\s*{(.*?)}\s*)?)+?)%}/gis;
    let key: RegExpExecArray = regChildrenComponent.exec(_tmpl);
    while (key) {
      const nameComponent: string = key[3];
      const child = this.ctx[nameComponent.trim()];
      if (child) {
        _tmpl = _tmpl.replace(key[0], child);
        regChildrenComponent.lastIndex += (-key[0].length + child.length);
      }

      key = regChildrenComponent.exec(_tmpl);
    }
    return _tmpl;
  }
}
