import { TPropsObject } from '../../core/block/typeBlock';
import { Block } from '../../core/block/Block';

export class Page404 extends Block {
  constructor(props: TPropsObject) {
    super({ data: props });
  }

  render() {
    return `<div class="col-lg-12 wrapper-center">
    <div class="text__center">404</div>
    <div class="text__center">Что-то пошло не так</div>
  </div>
  `;
  }
}
