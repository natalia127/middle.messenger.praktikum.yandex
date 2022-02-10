import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';

export class Button extends Block {
  constructor(props: TPropsObject) {
    const context = {
      value: '',
      class: ' '
    };
    const data = { ...context, ...props };
    super({ data });
  }

  render() {
    return `
     <button class="{{class}} button" >{{value}}</button>`;
  }
}
