import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';

const context = {
  value: ' ',
  placeholder: ' ',
  type: 'text',
  class: '',
  name: ' '
};

export class Input extends Block {
  constructor(props: TPropsObject) {
    const data = { ...context, ...props };
    super({ data });
  }

  render() {
    return `
    <input type="{{type}}" class="input {{class}}" placeholder="{{placeholder}}" value="{{value}}" name="{{name}}"/>`;
  }
}
