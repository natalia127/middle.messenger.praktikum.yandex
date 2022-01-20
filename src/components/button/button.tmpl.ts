import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';

export class Button extends Block {
  constructor(props: propsAndChildren) {
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
