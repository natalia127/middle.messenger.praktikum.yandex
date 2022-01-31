import header from '../modules/header/header';
import { Block } from '../core/Block';
import { TPropsAndChildren } from '../core/typeBlock';

import { getComponentTmpl } from '../core/router/routing';

let main = getComponentTmpl();

class App extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render() {
    return `<div style="height: 100vh">
           {% header %}
           <div class="container fullContainer main">{% main %}</div>
   </div>`;
  }
}

export const app = new App(
  {
    header,
    main
  }
);
