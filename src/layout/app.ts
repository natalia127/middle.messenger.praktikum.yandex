import { Header } from '../components/header/header';
import { Block } from '../core/block/Block';
import { TPropsObject } from '../core/typeBlock';
import { getComponentTmpl, registerRouts } from '../core/router/routing';
import { authController } from '../core/controllers/authController';
class App extends Block {
  constructor(props: TPropsObject) {
    super(props);
    authController.authorization();
    registerRouts();
  }

  componentDidMount(): void {
    getComponentTmpl();
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
