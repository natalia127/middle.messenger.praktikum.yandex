import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/typeBlock';
import {
  validateInput
} from '../../core/utils/validate';
import { tmpl } from './input.tmpl';

const context = {
  value: ' ',
  placeholder: ' ',
  type: 'text',
  class: '',
  name: ' ',
  messageError: ' ',
  isError: false,
  needValidate: false
};

export class Input extends Block {
  constructor(props: TPropsObject) {
    const data = { ...context, ...props };
    const info = {
      data,
      methods: {
        handlerInput(e: Event) {
          if (!e || !e.target) {
            return;
          }
          this.setProps({ value: (e.target as HTMLInputElement).value });
          if (this.props.needValidate) {
            validateInput(this);
          }
        }
      }
    };
    super(info);
  }

  componentReadyUse() {
    if (!this.props.needValidate) {
      return;
    }
    const content = this.getContent();
    const input = content.querySelector('.js-input');
    const inputMessage = content.querySelector('.js-input-message');
    if (!input || !inputMessage) {
      return;
    }
    if (this.props.isError) {
      input.classList.add('error');
      inputMessage.classList.add('input__messageError--active');
    } else {
      input.classList.remove('error');
      inputMessage.classList.remove('input__messageError--active');
    }
  }

  render() {
    return tmpl;
  }
}
