//TODO отрефакторить , + сделать циклы

import { getPropertyCtx, getSettingsNode, setAttributes } from "./utilsTemplator";
export class Templator {
  TEMPLATE_REGEXP = /\{\{([^\}\}].*?)\}\}/gi;
  constructor(component) {
    this._rawTemplate = component.blockTemplate();
    this.ctx = component.context;
    this.stackTreeEl = [];
    this.children = component.children;
  }

  compile() {
    let tmpl = this.compileRawTmpl().replace(/\n/g, '');
    return this._getDomEl(tmpl);
  }

  compileRawTmpl() {
    let tmpl = this._replaceOnCtxValue();
    tmpl = this._insertChildren(tmpl)
    return tmpl;
  }
  _insertChildren(tmpl) {
    if (!this.children) return tmpl
    const regChildrenComponent = /{%((\s*(\w+)\s*(context:\s*{(.*?)}\s*)?)+?)%}/gis
    let key = null;
    while ((key = regChildrenComponent.exec(tmpl))) {
      const nameComponent = key[3];
      const rawContext = key[5];


      const childrenComponent = this.children[nameComponent.trim()]
      if(!!childrenComponent) {
        if (rawContext) {
          this._setContextChildren(childrenComponent, rawContext)

        }
        const templator = new Templator(childrenComponent);
        let tmplChildren = templator.compileRawTmpl();
        tmpl = tmpl.replace(key[0], tmplChildren)
        regChildrenComponent.lastIndex =  tmplChildren.length - key[0].length
      }
    }
    return tmpl
  }
  _setContextChildren(children, ctx) {
    const regPropertyCtx = /(\w+)\s*:\s(('|")(.+)('|")|.[^\s'",]+)/g
    let key = null;
    while ((key = regPropertyCtx.exec(ctx))) {
      const keyCtx = key[1]
      let valueCtx = key[4]

      if (!valueCtx) {
        valueCtx = this.ctx[key[2]]
      }

      children.setContext({
        [keyCtx]: valueCtx
      })
    }
  }

  _replaceOnCtxValue() {
    const ctx =this.ctx;
    let tmpl = this._replaceBlockIfElse();
    
    let key = null;
    const regExp = /\{\{(.*?)\}\}/gis;
    while ((key = regExp.exec(tmpl))) {
        if (key[1]) {
            const tmplValue = key[1].trim();
            const data = getPropertyCtx(ctx, tmplValue);
            if (!data) {
              continue
            }
            if (typeof data === "function") {
              window[tmplValue] = data;
              tmpl = tmpl.replace(
                new RegExp(key[0], "gi"),
                `window.${key[1].trim()}()`
              );
              continue;
            }
            tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
            regExp.lastIndex = regExp.lastIndex - key[0].length + data.length
        }
    }
    return tmpl;
  }
  _replaceBlockIfElse () {

    //TODO дополнить блоками elseif
    const ctx = this.ctx;
    let tmpl = this._rawTemplate;
    let key = null;

    const regExp = /\{%\s*if\s*(.[^\s'",]+)\s*?%\}(.*?)((\{%\s*else\s*%\})(.*?))?(\{%\s*endif\s*%\})/gis;
    while ((key = regExp.exec(tmpl))) {
      const value = key[1];
      if (ctx.hasOwnProperty(value)) {
        let valueReplace = !!ctx[value] ? key[2] : ''
        if (!!ctx[value]) {
          valueReplace = key[2]
        } else if (key[3]) {
          valueReplace = key[5]
        } else {
          valueReplace = ''
        }
        tmpl = tmpl.replace(key[0], valueReplace)
        regExp.lastIndex = regExp.lastIndex - key[0].length + valueReplace.length
      }
    }
    return tmpl
  }
  _getDomEl(rawStr) {
    rawStr = rawStr.trim().replace(/\n/g, '')

    let completeTreeEl = (tmpl = rawStr, treeDepth = 0)=> {
      if (!tmpl) { 
        this._consetrateEl(treeDepth);
        return;
      }
      const settingsNode = getSettingsNode(tmpl);
      this.stackTreeEl.push(settingsNode)

      if (settingsNode.type === 'el' && settingsNode.typeTag === 'fullTag') {
        completeTreeEl(settingsNode.content)
      }
      if (settingsNode.indexEndInTmpl) {
        tmpl = tmpl.slice(settingsNode.indexEndInTmpl)
      }
      completeTreeEl(tmpl, ++treeDepth)
    }
    completeTreeEl()

    return this.stackTreeEl[0].el
  }

  _consetrateEl(treeDepth){
    if (this.stackTreeEl.length === 1 && this.stackTreeEl[0].el) {
      return
    }
    let nCurrentEl = this.stackTreeEl.length - 1 - treeDepth
    const rootEl = document.createElement(this.stackTreeEl[nCurrentEl].name)
    setAttributes(rootEl, this.stackTreeEl[nCurrentEl].attributes)
    for (nCurrentEl++; nCurrentEl < this.stackTreeEl.length; nCurrentEl++) {
      const currentEl = this.stackTreeEl[nCurrentEl]

      if (currentEl.type === 'el') {
        rootEl.appendChild(currentEl.el)
      }
      if (currentEl.type === 'text') {
        let textNode = document.createTextNode(this.stackTreeEl[nCurrentEl].content)
        rootEl.appendChild(textNode)
      }
    }
    this.stackTreeEl.splice( this.stackTreeEl.length - treeDepth, this.stackTreeEl.length - 1)
    this.stackTreeEl[this.stackTreeEl.length - 1].el = rootEl
  }

}

