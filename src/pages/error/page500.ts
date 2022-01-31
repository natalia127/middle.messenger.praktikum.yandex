import { TPropsAndChildren } from '../../core/typeBlock';
import { Block } from '../../core/Block';

export class Page500 extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render() {
    return `<div class="col-lg-12 wrapper-center">
    <div class="text__center">500</div>
    <div class="text__center">Что-то пошло не так</div>
  </div>
  `;
  }
}

export default ()=> (new Page500({}));
