import { Header } from '../modules/header/header';
import { Block } from '../core/Block';
import { TPropsObject } from '../core/typeBlock';
import { Router } from '../core/router/Router';
import { getComponentTmpl, registerRouts } from '../core/router/routing';

const router = new Router('.js-router');

class App extends Block {
  constructor(props: TPropsObject) {
    super(props);
  }

  componentDidMount(): void {
    let Main = getComponentTmpl();
  }

  componentBeforeRendering(): void {
    let Main = registerRouts();
  }

  render() {
    return `
    <div style="height: 100vh">
      <Header @click="clickHandler"/>
      <div class="container fullContainer main js-router">
          
      </div>   
   </div>`;
  }
}

export const app = new App(
  {
    components: {
      Header

    },
    methods: {

    }
  }
);
