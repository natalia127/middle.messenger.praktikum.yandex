import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/block/typeBlock';

export class Button extends Block {
  constructor(props: TPropsObject) {
    const context = {
      value: '',
      class: ' '
    };
    const info = {
      data: { ...context, ...props },
      methods: {
        handlerSubmit(e: Event) {
          e.preventDefault();
        }
      }
    };
    super(info);
  }

  render() {
    return `
     <button class="button {{class}} ">{{value}}</button>`;
  }
}
