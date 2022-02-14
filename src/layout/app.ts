import { Header } from '../modules/header/header';
import { Block } from '../core/Block';
import { TPropsObject } from '../core/typeBlock';
import { getComponentTmpl, registerRouts } from '../core/router/routing';
import { router } from '../core/router/initRouter';
console.log(router);

class App extends Block {
  constructor(props: TPropsObject) {
    super(props);
  }

  componentDidMount(): void {
    getComponentTmpl();
  }

  componentBeforeRendering(): void {
    registerRouts();
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
