import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { context } from '../tempContext';
import { Block } from '../../../core/Block';
import { TPropsAndChildren } from '../../../core/typeBlock';
import { validateForm, validateInput } from '../../../utils/validate';
import { template } from './passwordEdit.tmpl';

export class PasswordEdit extends Block {
  constructor(props: TPropsAndChildren) {
    const newProps = { ...context, ...props };
    super(newProps);
  }

  render() {
    return template;
  }
}

export default ()=> (new PasswordEdit({
  inputPassword: new Input({
    placeholder: ' ',
    class: 'input--outbord',
    name: 'oldPassword',
    type: 'password',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputNewPassword: new Input({
    placeholder: ' ',
    class: 'input--outbord',
    name: 'newPassword',
    type: 'password',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputRepeatPassword: new Input({
    placeholder: ' ',
    class: 'input--outbord',
    name: 'repeatPassword',
    type: 'password',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  button: new Button({
    value: 'Сохранить',
    class: 'form__button'
  }),
  events: {
    submit: function (e) {
      validateForm(e, ()=>{
        window.location.href = '/';
      });
    }
  }
}));
