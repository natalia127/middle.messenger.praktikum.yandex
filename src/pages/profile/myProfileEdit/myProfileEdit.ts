import { Input } from '../../../components/input/input';
import { Block } from '../../../core/Block';

import { Button } from '../../../components/button/button';
import { context } from '../tempContext';
import { propsAndChildren } from '../../../core/typeBlock';
import { template } from './myProfileEdit.tmpl';
import { validateForm, validateInput } from '../../../utils/validate';
class MyProfileEdit extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render() {
    return template;
  }
}

export default ()=> (new MyProfileEdit({
  inputEmail: new Input({
    placeholder: 'e-mail',
    class: 'input--outbord',
    name: 'email',
    value: context.email,
    type: 'email',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputLogin: new Input({
    placeholder: 'Логин',
    class: 'input--outbord',
    name: 'login',
    value: context.login,
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputDisplayName: new Input({
    placeholder: 'Отображаемое имя',
    class: 'input--outbord',
    name: 'display_name',
    value: context.display_name,
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputFirstName: new Input({
    placeholder: 'имя',
    class: 'input--outbord',
    name: 'first_name',
    value: context.first_name,
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputSecondName: new Input({
    placeholder: 'Фамилия',
    class: 'input--outbord',
    name: 'second_name',
    value: context.second_name,
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputPhone: new Input({
    placeholder: 'телефон',
    class: 'input--outbord',
    name: 'phone',
    value: context.phone,
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
