import { propsAndChildren } from '../../core/typeBlock';
import { Block } from '../../core/Block';

export class Page404 extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render() {
    return `<div class="col-lg-12 wrapper-center">
    <div class="text__center">404</div>
    <div class="text__center">Что-то пошло не так</div>
  </div>
  `;
  }
}

export default ()=> (new Page404({}));
