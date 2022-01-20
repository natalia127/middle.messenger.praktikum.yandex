import { Block } from '../../core/Block';

const context = {
  value: ' ',
  placeholder: 'placehol88der',
  type: 'text',
  class: '',
  name: ' '
};

export class Input extends Block {
  constructor(props) {
    const newProps = { ...context, ...props };
    super(newProps);
  }

  render() {
    return `
    <input type="{{type}}" class="input {{class}}" placeholder="{{placeholder}}" value="{{value}}" />`;
  }
}
