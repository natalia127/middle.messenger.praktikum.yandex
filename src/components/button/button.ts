import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';

export class Button extends Block {
  constructor(props: TPropsAndChildren) {
    const context = {
      value: '',
      class: ' '
    };
    const newProps = { ...context, ...props };
    super(newProps);
  }

  render() {
    return `
     <button class="{{class}} button" >{{value}}</button>`;
  }
}
