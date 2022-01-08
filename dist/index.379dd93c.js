// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"j1F46":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "c9b2bbcd379dd93c";
"use strict";
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                var oldDeps = modules[asset.id][1];
                for(var dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    var id = oldDeps[dep];
                    var parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id1) {
    var modules = bundle.modules;
    if (!modules) return;
    if (modules[id1]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        var deps = modules[id1][1];
        var orphans = [];
        for(var dep in deps){
            var parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id1];
        delete bundle.cache[id1]; // Now delete the orphans.
        orphans.forEach(function(id) {
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id1);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    var parents = getParents(module.bundle.root, id);
    var accepted = false;
    while(parents.length > 0){
        var v = parents.shift();
        var a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            var p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push.apply(parents, _toConsumableArray(p));
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"hD4hw":[function(require,module,exports) {
var _stylesScss = require("./css/styles.scss");
var _render = require("./templateEngine/render");
_render.render();

},{"./css/styles.scss":"f6VKU","./templateEngine/render":"bYX5q"}],"f6VKU":[function() {},{}],"bYX5q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "render", ()=>render
);
var _templator = require("./Templator");
var _appTmpl = require("../layout/app.tmpl");
var _appTmplDefault = parcelHelpers.interopDefault(_appTmpl);
function render() {
    const tmpl = new _templator.Templator(_appTmplDefault.default);
    const renderedTemplate = tmpl.compile();
    const root = document.querySelector('.root');
    root.innerHTML = '';
    root.appendChild(renderedTemplate);
    afterCompile();
}
function afterCompile() {
    const forms = document.getElementsByTagName('form');
    Array.from(forms).forEach((form)=>form.addEventListener('submit', (e)=>{
            console.log('s');
            e.preventDefault();
        })
    );
}

},{"./Templator":"90Sxz","../layout/app.tmpl":"hkfrR","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"90Sxz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Templator", ()=>Templator
);
//TODO отрефакторить , + сделать циклы
var _utilsTemplator = require("./utilsTemplator");
class Templator {
    TEMPLATE_REGEXP = /\{\{([^\}\}].*?)\}\}/gi;
    constructor(component){
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
        tmpl = this._insertChildren(tmpl);
        return tmpl;
    }
    _insertChildren(tmpl) {
        if (!this.children) return tmpl;
        const regChildrenComponent = /{%((\s*(\w+)\s*(context:\s*{(.*?)}\s*)?)+?)%}/gis;
        let key = null;
        while(key = regChildrenComponent.exec(tmpl)){
            const nameComponent = key[3];
            const rawContext = key[5];
            const childrenComponent = this.children[nameComponent.trim()];
            if (!!childrenComponent) {
                if (rawContext) this._setContextChildren(childrenComponent, rawContext);
                const templator = new Templator(childrenComponent);
                let tmplChildren = templator.compileRawTmpl();
                tmpl = tmpl.replace(key[0], tmplChildren);
                regChildrenComponent.lastIndex = tmplChildren.length - key[0].length;
            }
        }
        return tmpl;
    }
    _setContextChildren(children, ctx) {
        const regPropertyCtx = /(\w+)\s*:\s(('|")(.+)('|")|.[^\s'",]+)/g;
        let key = null;
        while(key = regPropertyCtx.exec(ctx)){
            const keyCtx = key[1];
            let valueCtx = key[4];
            if (!valueCtx) valueCtx = this.ctx[key[2]];
            children.setContext({
                [keyCtx]: valueCtx
            });
        }
    }
    _replaceOnCtxValue() {
        const ctx = this.ctx;
        let tmpl = this._replaceBlockIfElse();
        let key = null;
        const regExp = /\{\{(.*?)\}\}/gis;
        while(key = regExp.exec(tmpl))if (key[1]) {
            const tmplValue = key[1].trim();
            const data = _utilsTemplator.getPropertyCtx(ctx, tmplValue);
            if (!data) continue;
            if (typeof data === "function") {
                window[tmplValue] = data;
                tmpl = tmpl.replace(new RegExp(key[0], "gi"), `window.${key[1].trim()}()`);
                continue;
            }
            tmpl = tmpl.replace(new RegExp(key[0], "gi"), data);
            regExp.lastIndex = regExp.lastIndex - key[0].length + data.length;
        }
        return tmpl;
    }
    _replaceBlockIfElse() {
        //TODO дополнить блоками elseif
        const ctx = this.ctx;
        let tmpl = this._rawTemplate;
        let key = null;
        const regExp = /\{%\s*if\s*(.[^\s'",]+)\s*?%\}(.*?)((\{%\s*else\s*%\})(.*?))?(\{%\s*endif\s*%\})/gis;
        while(key = regExp.exec(tmpl)){
            const value = key[1];
            if (ctx.hasOwnProperty(value)) {
                let valueReplace = !!ctx[value] ? key[2] : '';
                if (!!ctx[value]) valueReplace = key[2];
                else if (key[3]) valueReplace = key[5];
                else valueReplace = '';
                tmpl = tmpl.replace(key[0], valueReplace);
                regExp.lastIndex = regExp.lastIndex - key[0].length + valueReplace.length;
            }
        }
        return tmpl;
    }
    _getDomEl(rawStr) {
        rawStr = rawStr.trim().replace(/\n/g, '');
        let completeTreeEl = (tmpl = rawStr, treeDepth = 0)=>{
            if (!tmpl) {
                this._consetrateEl(treeDepth);
                return;
            }
            const settingsNode = _utilsTemplator.getSettingsNode(tmpl);
            this.stackTreeEl.push(settingsNode);
            if (settingsNode.type === 'el' && settingsNode.typeTag === 'fullTag') completeTreeEl(settingsNode.content);
            if (settingsNode.indexEndInTmpl) tmpl = tmpl.slice(settingsNode.indexEndInTmpl);
            completeTreeEl(tmpl, ++treeDepth);
        };
        completeTreeEl();
        return this.stackTreeEl[0].el;
    }
    _consetrateEl(treeDepth) {
        if (this.stackTreeEl.length === 1 && this.stackTreeEl[0].el) return;
        let nCurrentEl = this.stackTreeEl.length - 1 - treeDepth;
        const rootEl = document.createElement(this.stackTreeEl[nCurrentEl].name);
        _utilsTemplator.setAttributes(rootEl, this.stackTreeEl[nCurrentEl].attributes);
        for(nCurrentEl++; nCurrentEl < this.stackTreeEl.length; nCurrentEl++){
            const currentEl = this.stackTreeEl[nCurrentEl];
            if (currentEl.type === 'el') rootEl.appendChild(currentEl.el);
            if (currentEl.type === 'text') {
                let textNode = document.createTextNode(this.stackTreeEl[nCurrentEl].content);
                rootEl.appendChild(textNode);
            }
        }
        this.stackTreeEl.splice(this.stackTreeEl.length - treeDepth, this.stackTreeEl.length - 1);
        this.stackTreeEl[this.stackTreeEl.length - 1].el = rootEl;
    }
}

},{"./utilsTemplator":"aCvkR","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"aCvkR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getPropertyCtx", ()=>getPropertyCtx
);
parcelHelpers.export(exports, "getAttributesTag", ()=>getAttributesTag
);
parcelHelpers.export(exports, "getNameTag", ()=>getNameTag
);
parcelHelpers.export(exports, "parseInfoTag", ()=>parseInfoTag
);
parcelHelpers.export(exports, "getInfoSingleTag", ()=>getInfoSingleTag
);
parcelHelpers.export(exports, "getInfoFullTag", ()=>getInfoFullTag
);
parcelHelpers.export(exports, "setAttributes", ()=>setAttributes
);
parcelHelpers.export(exports, "getTag", ()=>getTag
);
parcelHelpers.export(exports, "getText", ()=>getText
);
parcelHelpers.export(exports, "getSettingsNode", ()=>getSettingsNode
);
function getPropertyCtx(obj, path, defaultValue) {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys){
        result = result[key];
        if (result === undefined) return defaultValue;
    }
    return result ?? defaultValue;
}
function getAttributesTag(rawStr) {
    const regFullAtrribute = /(.+?)=\s*("|')(.+?)("|')/gi;
    const attributes = [];
    let key = null;
    while(key = regFullAtrribute.exec(rawStr))attributes.push({
        fullStr: key[0],
        key: key[1].trim(),
        value: key[3].trim()
    });
    attributes.forEach((att)=>{
        rawStr = rawStr.split(att.fullStr).join('');
    });
    attributes.push(...rawStr.split(' ').filter((a)=>a
    ).map((att)=>{
        return {
            key: att,
            value: true
        };
    }));
    attributes.forEach((att)=>{
        delete att.fullStr;
    });
    return attributes;
}
function getNameTag(rawStr) {
    const regNameTag = /^(\w+)\s/;
    let nameTag = rawStr.match(regNameTag);
    nameTag = nameTag ? nameTag[1] : rawStr;
    return nameTag;
}
function parseInfoTag(initialStr) {
    const result = {
        name: null,
        attributes: []
    };
    let rawStr = initialStr.trim();
    result.name = getNameTag(rawStr);
    rawStr = rawStr.slice(result.name.length).trim();
    if (rawStr.length) result.attributes = getAttributesTag(rawStr);
    return result;
}
function getInfoSingleTag(tag) {
    let { name , attributes  } = parseInfoTag(tag[1]);
    let result = {
        name,
        attributes
    };
    result.indexSlice = tag[0].length;
    return result;
}
function getInfoFullTag(tag, rawStr) {
    let { name , attributes  } = parseInfoTag(tag[1]);
    let indexSlice = 0;
    let regCurrentClosingTag = new RegExp(`<\/${name}\\s*>`, 'g');
    let regCurrentOpeningTag = new RegExp(`<${name}.*?\\s*>`, 'g');
    regCurrentOpeningTag.lastIndex = tag[0].length;
    let closingTag = null;
    let isEndTagFound = false;
    let content = '';
    while(!isEndTagFound){
        let alsoOpeningTag = regCurrentOpeningTag.exec(rawStr);
        closingTag = regCurrentClosingTag.exec(rawStr);
        if (!alsoOpeningTag || alsoOpeningTag.index > closingTag.index) {
            isEndTagFound = true;
            indexSlice = regCurrentClosingTag.lastIndex;
        }
    }
    content = rawStr.slice(tag[0].length, closingTag.index);
    return {
        name,
        attributes,
        content,
        indexSlice
    };
}
function setAttributes(el, attributes) {
    attributes.forEach((att)=>{
        if (att.key === 'class') el.className = att.value;
        el.setAttribute(att.key, att.value);
    });
}
function getTag(rawStr) {
    const reqSingleTag = /<(.[^>]+?)\/>{1}?/;
    const regOpeningTag = /<(.+?)>/;
    let singleTag = rawStr.match(reqSingleTag);
    let openingTag = rawStr.match(regOpeningTag);
    let result = null;
    if (singleTag && singleTag.index === 0) {
        result = getInfoSingleTag(singleTag);
        result.type = 'singleTag';
    } else if (openingTag && openingTag.index === 0) {
        result = getInfoFullTag(openingTag, rawStr);
        result.type = 'fullTag';
    }
    return result;
}
function getText(tmpl) {
    const reqSearchText = /[^<]+/;
    let text = tmpl.match(reqSearchText);
    text = text ? text[0] : '';
    return text;
}
function getSettingsNode(tmpl) {
    let tag = getTag(tmpl);
    let settingsNode = {
    };
    if (tag) {
        settingsNode = {
            name: tag.name,
            attributes: tag.attributes,
            type: 'el',
            content: tag.content,
            typeTag: tag.type,
            indexEndInTmpl: tag.indexSlice
        };
        if (tag.type === 'singleTag') {
            const singleEL = document.createElement(tag.name);
            setAttributes(singleEL, tag.attributes);
            settingsNode.el = singleEL;
        }
    } else {
        let textContent = getText(tmpl);
        settingsNode = {
            type: 'text',
            content: textContent,
            indexEndInTmpl: textContent.length
        };
    }
    return settingsNode;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"hkfrR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _headerTmpl = require("../modules/header/header.tmpl");
var _headerTmplDefault = parcelHelpers.interopDefault(_headerTmpl);
var _routing = require("../router/routing");
let main = _routing.getComponentTmpl();
const blockTemplate = function() {
    return `<div style="height: 100vh"> {% Header %}
  <div class="container fullContainer main">{% main %}</div>
  </div>
  `;
};
exports.default = {
    blockTemplate,
    children: {
        main,
        Header: _headerTmplDefault.default
    }
};

},{"../modules/header/header.tmpl":"kag0Z","../router/routing":"0Yjbx","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kag0Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const context = {
};
const header = `<div class='header'>
  <div class="container">
    <span class="linkProfile"><a href="./my-profile">Мой профиль</a></span>
  </div>

</div>
`;
const blockTemplate = function() {
    return `${header}`;
};
exports.default = {
    blockTemplate,
    context
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"0Yjbx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getComponentTmpl", ()=>getComponentTmpl
);
var _namePath = require("./namePath");
var _myProfileTmpl = require("../pages/profile/myProfile.tmpl");
var _myProfileTmplDefault = parcelHelpers.interopDefault(_myProfileTmpl);
var _myProfileEditTmpl = require("../pages/profile/myProfileEdit.tmpl");
var _myProfileEditTmplDefault = parcelHelpers.interopDefault(_myProfileEditTmpl);
var _passwordEditTmpl = require("../pages/profile/passwordEdit.tmpl");
var _passwordEditTmplDefault = parcelHelpers.interopDefault(_passwordEditTmpl);
var _chatTmpl = require("../pages/chat/chat.tmpl");
var _chatTmplDefault = parcelHelpers.interopDefault(_chatTmpl);
var _page404Tmpl = require("../pages/error/page404.tmpl");
var _page404TmplDefault = parcelHelpers.interopDefault(_page404Tmpl);
var _page500Tmpl = require("../pages/error/page500.tmpl");
var _page500TmplDefault = parcelHelpers.interopDefault(_page500Tmpl);
var _authTmpl = require("../pages/auth/auth.tmpl");
var _authTmplDefault = parcelHelpers.interopDefault(_authTmpl);
function getComponentTmpl() {
    let path = location.pathname;
    let componentTmpl;
    switch(path){
        case _namePath.PROFILE:
            componentTmpl = _myProfileTmplDefault.default;
            break;
        case _namePath.EDIT_PROFILE:
            componentTmpl = _myProfileEditTmplDefault.default;
            break;
        case _namePath.EDIT_PASSWORD:
            componentTmpl = _passwordEditTmplDefault.default;
            break;
        case _namePath.CHAT:
            componentTmpl = _chatTmplDefault.default;
            break;
        case _namePath.PAGE500:
            componentTmpl = _page500TmplDefault.default;
            break;
        case _namePath.SIGNIN:
            componentTmpl = _authTmplDefault.default;
            break;
        case _namePath.SIGNUP:
            componentTmpl = _authTmplDefault.default;
            break;
        default:
            componentTmpl = _page404TmplDefault.default;
            break;
    }
    return componentTmpl;
}

},{"./namePath":"kZOte","../pages/profile/myProfile.tmpl":"7aC7i","../pages/profile/myProfileEdit.tmpl":"ir9bf","../pages/profile/passwordEdit.tmpl":"ksfNw","../pages/chat/chat.tmpl":"4RoDP","../pages/error/page404.tmpl":"1JzIL","../pages/error/page500.tmpl":"953Rk","../pages/auth/auth.tmpl":"ftcUJ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kZOte":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SIGNIN", ()=>SIGNIN
);
parcelHelpers.export(exports, "SIGNUP", ()=>SIGNUP
);
parcelHelpers.export(exports, "PROFILE", ()=>PROFILE
);
parcelHelpers.export(exports, "EDIT_PROFILE", ()=>EDIT_PROFILE
);
parcelHelpers.export(exports, "EDIT_PASSWORD", ()=>EDIT_PASSWORD
);
parcelHelpers.export(exports, "CHAT", ()=>CHAT
);
parcelHelpers.export(exports, "PAGE500", ()=>PAGE500
);
const SIGNIN = '/sign-in';
const SIGNUP = '/sign-up';
const PROFILE = '/my-profile';
const EDIT_PROFILE = '/edit-profile';
const EDIT_PASSWORD = '/edit-password';
const CHAT = '/';
const PAGE500 = '/500';

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7aC7i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _avatarTmpl = require("../../components/avatar/avatar.tmpl");
var _avatarTmplDefault = parcelHelpers.interopDefault(_avatarTmpl);
var _tempContext = require("./tempContext");
const blockTemplate = function() {
    return `<div class="col-lg-12 wrapperCenter">
    <div class="profile">
      {% Avatar 
        context: {
          size: '5em',
          class: 'profile__avatar'
        }
      %}
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Почта</div>
          <div class="profile__itemInfo">{{ email }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Логин</div>
          <div class="profile__itemInfo">{{ login }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Отображаемое имя</div>
          <div class="profile__itemInfo">{{ display_name }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Имя</div>
          <div class="profile__itemInfo">{{ first_name }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Фамилия</div>
          <div class="profile__itemInfo">{{ second_name }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Телефон</div>
          <div class="profile__itemInfo">{{ phone }}</div>
        </div>

      </div>
      
      <div class="profile__actions">
        <div class="profile__action profile__edit"><a href="./edit-profile">Изменить данные</a></div>
        <div class="profile__action profile__edit" ><a href="./edit-password">Изменить пароль</a></div>
        <div class="profile__action profile__exit"><a href="./sign-in">Выйти</a></div>
      </div>
    </div>
    
  </div>
  `;
};
exports.default = {
    blockTemplate,
    context: _tempContext.context,
    children: {
        Avatar: _avatarTmplDefault.default
    }
};

},{"../../components/avatar/avatar.tmpl":"6MqaK","./tempContext":"htrvY","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"6MqaK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utils = require("../utils");
const context = {
    isChange: true,
    size: '2em',
    class: '',
    srcImg: './defaultImg.png',
    _styles: getStyleAvatar('2em'),
    handler: function() {
        return false;
    }
};
function getStyleAvatar(size) {
    return `"width: ${size};
    height:${size};
    border-radius: calc(${size}/2)"
    `;
}
let contextProxy = new Proxy(context, {
    set: function(obj, prop, value) {
        if (prop === 'size') obj._styles = getStyleAvatar(value);
        obj[prop] = value;
        return true;
    }
});
const blockTemplate = function() {
    return `<div class="avatar {{class}}" style={{_styles}}> 
  <img  class="avatar__img " src="{{srcImg}}"  />
  {% if isChange %}
  <div class="avatar__edit"></div>
  {% endif %}
</div>`;
};
const component = new _utils.Component(contextProxy, blockTemplate);
exports.default = component;

},{"../utils":"k7yVJ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"k7yVJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// export const setContext = (arg) => {
//   Object.entries(arg).forEach(([key, value]) => {
//     if (context.hasOwnProperty(key)) {
//       context[key] = value
//     }
//   })
// }
parcelHelpers.export(exports, "Component", ()=>Component
);
class Component {
    constructor(ctx, blockTemplate){
        this.context = ctx;
        this.blockTemplate = blockTemplate;
    }
    setContext(arg) {
        Object.entries(arg).forEach(([key, value])=>{
            if (this.context.hasOwnProperty(key)) this.context[key] = value;
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"htrvY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "context", ()=>context
);
const context = {
    email: 'pochta@mail.ru',
    login: 'логин',
    first_name: 'имя',
    second_name: 'фамилия',
    phone: '89999999999',
    display_name: 'имявчата'
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ir9bf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _inputTmpl = require("../../components/input/input.tmpl");
var _inputTmplDefault = parcelHelpers.interopDefault(_inputTmpl);
var _buttonTmpl = require("../../components/button/button.tmpl");
var _buttonTmplDefault = parcelHelpers.interopDefault(_buttonTmpl);
var _tempContext = require("./tempContext");
const blockTemplate = function() {
    return `<div class="col-lg-12 wrapperCenter">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Почта</div>
          {%
            Input
            context: {
              placeholder: 'e-mail',
              class: 'input--outbord',
              name: 'email', 
              value: email,
              type: 'email'
            }
          %}
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Логин</div>
          {%
            Input
            context: {
              placeholder: 'Логин',
              class: 'input--outbord',
              name: 'login', 
              value: login
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Отображаемое имя</div>
          {%
            Input
            context: {
              placeholder: 'Отображаемое имя',
              class: 'input--outbord',
              name: 'display_name', 
              value: display_name
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Имя</div>
          {%
            Input
            context: {
              placeholder: 'имя',
              class: 'input--outbord',
              name: 'first_name', 
              value: first_name
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Фамилия</div>
          {%
            Input
            context: {
              placeholder: 'Фамилия',
              class: 'input--outbord',
              name: 'second_name', 
              value: second_name
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Телефон</div>
          {%
            Input
            context: {
              placeholder: 'телефон',
              class: 'input--outbord',
              name: 'phone', 
              value: phone
            }
          %}
        </div>

      </div>
      
      <div class="profile__actions profile__actions--center">
        <a href="./">
          {% Button 
            context: {
              value: 'Сохранить',
              class: 'form__button'
            }
          %}
        </a>
      </div>
    </div>
    
  </div>
  `;
};
exports.default = {
    blockTemplate,
    context: _tempContext.context,
    children: {
        Input: _inputTmplDefault.default,
        Button: _buttonTmplDefault.default
    }
};

},{"../../components/input/input.tmpl":"kNEho","../../components/button/button.tmpl":"bqoMY","./tempContext":"htrvY","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"kNEho":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utils = require("../utils");
const context = {
    value: ' ',
    placeholder: 'placeholder',
    type: 'text',
    class: '',
    name: ' ',
    handler: function() {
        return false;
    }
};
const blockTemplate = function() {
    return `<input type="{{type}}"  class="input {{class}}" placeholder="{{placeholder}}" value="{{value}}" />`;
};
const component = new _utils.Component(context, blockTemplate);
exports.default = component;

},{"../utils":"k7yVJ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bqoMY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _utils = require("../utils");
const context = {
    value: '',
    class: ' ',
    handler: function() {
        return false;
    }
};
const blockTemplate = function() {
    return `<button class="{{class}} button" onClick="{{handler}}">{{value}}</button>`;
};
const component = new _utils.Component(context, blockTemplate);
exports.default = component;

},{"../utils":"k7yVJ","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ksfNw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _inputTmpl = require("../../components/input/input.tmpl");
var _inputTmplDefault = parcelHelpers.interopDefault(_inputTmpl);
var _buttonTmpl = require("../../components/button/button.tmpl");
var _buttonTmplDefault = parcelHelpers.interopDefault(_buttonTmpl);
var _tempContext = require("./tempContext");
const blockTemplate = function() {
    return `<div class="col-lg-12 wrapperCenter">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Старый пароль</div>
          {%
            Input
            context: {
              placeholder: ' ',
              class: 'input--outbord',
              name: 'oldPassword', 

              type: 'password'
            }
          %}
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Новый пароль</div>
          {%
            Input
            context: {
              placeholder: ' ',
              class: 'input--outbord',
              name: 'newPassword', 
              type: 'password'
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Повторите новый пароль</div>
          {%
            Input
            context: {
              placeholder: ' ',
              class: 'input--outbord',
              name: 'newPassword', 
              type: 'password'
            }
          %}
        </div>



      </div>
      
      <div class="profile__actions profile__actions--center">
        <a href="./">
          {% Button 
            context: {
              value: 'Сохранить',
              class: 'form__button'
            }
          %}
        </a>
      </div>
    </div>
    
  </div>
  `;
};
exports.default = {
    blockTemplate,
    context: _tempContext.context,
    children: {
        Input: _inputTmplDefault.default,
        Button: _buttonTmplDefault.default
    }
};

},{"../../components/input/input.tmpl":"kNEho","../../components/button/button.tmpl":"bqoMY","./tempContext":"htrvY","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4RoDP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _listChatTmpl = require("../../modules/listChat/listChat.tmpl");
var _listChatTmplDefault = parcelHelpers.interopDefault(_listChatTmpl);
var _profileChatTmpl = require("../../modules/profileChat/profileChat.tmpl");
var _profileChatTmplDefault = parcelHelpers.interopDefault(_profileChatTmpl);
var _settingsChatTmpl = require("../../modules/settingsChat/settingsChat.tmpl");
var _settingsChatTmplDefault = parcelHelpers.interopDefault(_settingsChatTmpl);
var _screenChatTmpl = require("../../modules/screenChat/screenChat.tmpl");
var _screenChatTmplDefault = parcelHelpers.interopDefault(_screenChatTmpl);
const context = {
};
let main = `
  <div class="row fullContainer">
     <div class="col-lg-3">{% listChat %}</div>
   <div class="col-lg-6 fullContainer">{% screenChat %}</div>
     <div class="col-lg-3">{% settingsChat %}</div>
   </div>
 `;
const blockTemplate = function() {
    return `${main}
  `;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        listChat: _listChatTmplDefault.default,
        screenChat: _screenChatTmplDefault.default,
        profileChat: _profileChatTmplDefault.default,
        settingsChat: _settingsChatTmplDefault.default
    }
};

},{"../../modules/listChat/listChat.tmpl":"U2Db6","../../modules/profileChat/profileChat.tmpl":"4J71A","../../modules/settingsChat/settingsChat.tmpl":"1YSD3","../../modules/screenChat/screenChat.tmpl":"8m2wi","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"U2Db6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _inputTmpl = require("../../components/input/input.tmpl");
var _inputTmplDefault = parcelHelpers.interopDefault(_inputTmpl);
const context = {
};
const listChat = `<div class="listChat ">
{%
  Input
  context: {
    placeholder: 'имя чата',
    class: 'listChat__search',
    type: 'search',
    name: 'message'
  }
%}
<ul>
  <li>
    <div></div>
    <div class="listChat__item">
      <span class="listChat__name">name chat</span>
      <span  class="listChat__lastMessage">last message</span>
      <div class="listChat__nMessage">1</div>

    </div>
  </li>
</ul>

</div>`;
const blockTemplate = function() {
    return `${listChat}
  `;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        Input: _inputTmplDefault.default
    }
};

},{"../../components/input/input.tmpl":"kNEho","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"4J71A":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _avatarTmpl = require("../../components/avatar/avatar.tmpl");
var _avatarTmplDefault = parcelHelpers.interopDefault(_avatarTmpl);
const context = {
};
const profileChat = `<div class="profileChat">
  <div class="profileChat__iconSettings"></div>
  <div class="profileChat__title"> Профиль чата </div>
  {% Avatar %}
  <div class="profileChat__party">
    <div class="profileChat__partyTitle">Участники</div>
    <ul class="profileChat__partyList">
      <li class="profileChat__participant">
        <div class="profileChat__imgParticipant ">
        </div>
        <div>name profile</div>
      </li>
    </ul>
  </div>
</div>`;
const blockTemplate = function() {
    return `${profileChat}
  `;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        Avatar: _avatarTmplDefault.default
    }
};

},{"../../components/avatar/avatar.tmpl":"6MqaK","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1YSD3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const context = {
};
const settingsChat = `<div class="settingsChat">
  <div class="settingsChat__editImg ">
    <div class="settingsChat__imgChat"></div>
    <div class="settingsChat__text">Изменить аватар чата</div>
  </div>

  <div class="settingsChat__party">
    <div class="settingsChat__partyTitle">
      <div class="settingsChat__icon settingsChat__iAdd"> +
      </div>
      <div class="settingsChat__text"> Добавить пользователя </div>
    </div>
    <ul class="settingsChat__partyList">
      <li class="settingsChat__participant">
        <div class="settingsChat__icon settingsChat__iDelParty"> -
        </div>
        <div class="settingsChat__imgParticipant">
        </div>
        <div>name profile</div>
      </li>
    </ul>

  </div>
  <div class="settingsChat__delChat">
    <div class="settingsChat__icon settingsChat__iDelChat"> +
    </div>
    <div class="settingsChat__text">Удалить чат</div>
  </div>
</div>`;
const blockTemplate = function() {
    return `${settingsChat}
  `;
};
exports.default = {
    blockTemplate,
    context,
    children: {
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"8m2wi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _inputTmpl = require("../../components/input/input.tmpl");
var _inputTmplDefault = parcelHelpers.interopDefault(_inputTmpl);
const context = {
};
// const screenChat = `<div class="chat fullContainer">
//   <div class="chat__choice">Выберите чат чтобы отправить сообщение</div>
// </div>`
const screenChat = `<div class="chat">
  <div class="chat__correspondence">
    <div class="chat__wrapperMessages">
      <div class="chat__imgProfile"></div>
      <div class="chat__messages">
        <div class="chat__message">
          Какое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщениеКакое-то сообщение
        </div>
      </div>
    </div>
    <div class="chat__wrapperMessages">
      <div class="chat__imgProfile"></div>
      <div class="chat__messages">
        <div class="chat__message">
        Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222
        </div>
        <div class="chat__message">
        Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222Какое-то сообщение2222
        </div>
      </div>
    </div>
  </div>
  {%
    Input
    context: {
      placeholder: 'Написать сообщение',
      class: 'chat__print',
      type: 'text'
    }
  %}
</div>`;
const blockTemplate = function() {
    return `${screenChat}
  `;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        Input: _inputTmplDefault.default
    }
};

},{"../../components/input/input.tmpl":"kNEho","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"1JzIL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const context = {
};
const blockTemplate = function() {
    return `<div class="col-lg-12 wrapperCenter">
    <div class="text__center">404</div>
    <div class="text__center">Что-то пошло не так</div>
  </div>
  `;
};
exports.default = {
    blockTemplate,
    context
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"953Rk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const context = {
};
const blockTemplate = function() {
    return `<div class="col-lg-12 wrapperCenter">
    <div class="text__center">500</div>
    <div class="text__center">Что-то пошло не так</div>
  </div>
  `;
};
exports.default = {
    blockTemplate,
    context
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ftcUJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _signInTmpl = require("../../modules/signIn/signIn.tmpl");
var _signInTmplDefault = parcelHelpers.interopDefault(_signInTmpl);
var _signUpTmpl = require("../../modules/signUp/signUp.tmpl");
var _signUpTmplDefault = parcelHelpers.interopDefault(_signUpTmpl);
var _namePath = require("../../router/namePath");
const context = {
};
let form = ` `;
if (location.pathname === _namePath.SIGNIN) form = `signIn`;
else if (location.pathname === _namePath.SIGNUP) form = `signUp`;
const blockTemplate = function() {
    return `<div class="col-lg-12 wrapperCenter">{% ${form} %}</div>
  `;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        signIn: _signInTmplDefault.default,
        signUp: _signUpTmplDefault.default
    }
};

},{"../../modules/signIn/signIn.tmpl":"d2DBe","../../modules/signUp/signUp.tmpl":"5aEUw","../../router/namePath":"kZOte","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"d2DBe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _buttonTmpl = require("../../components/button/button.tmpl");
var _buttonTmplDefault = parcelHelpers.interopDefault(_buttonTmpl);
var _inputTmpl = require("../../components/input/input.tmpl");
var _inputTmplDefault = parcelHelpers.interopDefault(_inputTmpl);
const context = {
    value: 'Sign In'
};
const tmplSignIn = `
<div >
  <form class="form" >
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">

      {% 
        Input
        context: {
          placeholder: 'Логин',
          class: 'input--withBord form__input ',
          name: 'login' 
        }
      %}


    {%
      Input
      context: {
        placeholder: 'пароль',
        class: 'input--withBord form__input',
        type: 'password',
        name: 'password' 
      }
    %}

      <a href="./">
        {% Button 
          context: {
            value: 'Войти',
            class: 'form__button'
          }
        %}
      </a>
 
      <div class="form__text"><a href="./sign-up">signUp</a></div>
    </div>
  </form>
  </div>
`;
const blockTemplate = function() {
    return `${tmplSignIn}`;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        Button: _buttonTmplDefault.default,
        Input: _inputTmplDefault.default
    }
};

},{"../../components/button/button.tmpl":"bqoMY","../../components/input/input.tmpl":"kNEho","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"5aEUw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _buttonTmpl = require("../../components/button/button.tmpl");
var _buttonTmplDefault = parcelHelpers.interopDefault(_buttonTmpl);
var _inputTmpl = require("../../components/input/input.tmpl");
var _inputTmplDefault = parcelHelpers.interopDefault(_inputTmpl);
const context = {
    value: 'Sign Up'
};
const tmplSignIn = `
<div >
  <form class="form" >
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
    {%
      Input
      context: {
        placeholder: 'имя',
        class: 'input--withBord form__input',
        name: 'first_name'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'Фамилия',
        class: 'input--withBord form__input',
        name: 'second_name'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'Логин',
        class: 'input--withBord form__input',
        name: 'login'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'e-mail',
        class: 'input--withBord form__input',
        type: 'email',
        name: 'email'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'телефон',
        class: 'input--withBord form__input',
        type: 'number',
        name: 'phone'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'пароль',
        class: 'input--withBord form__input',
        type: 'password',
        name: 'password'
      }
    %}
      {% Button 
        context: {
          value: '<a href="./">Зарегестрироваться</a>',
          class: 'form__button'
        }
      %}

    </div>
  </form>
  </div>
`;
const blockTemplate = function() {
    return `${tmplSignIn}`;
};
exports.default = {
    blockTemplate,
    context,
    children: {
        Button: _buttonTmplDefault.default,
        Input: _inputTmplDefault.default
    }
};

},{"../../components/button/button.tmpl":"bqoMY","../../components/input/input.tmpl":"kNEho","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["j1F46","hD4hw"], "hD4hw", "parcelRequire25d8")

//# sourceMappingURL=index.379dd93c.js.map
