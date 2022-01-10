import Header from '../modules/header/header.tmpl'

import {getComponentTmpl} from '../router/routing'

let main = getComponentTmpl()

const blockTemplate = function() {
  return `<div style="height: 100vh"> {% Header %}
  <div class="container fullContainer main">{% main %}</div>
  </div>
  `;
}

export  default {
  blockTemplate,

  children: {
    main,
    Header
  }
}
