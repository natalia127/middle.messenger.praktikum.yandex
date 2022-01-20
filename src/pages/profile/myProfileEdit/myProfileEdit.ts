import { Input } from '../../../components/input/input.tmpl';
import { Block } from '../../../core/Block';

import { Button } from '../../../components/button/button.tmpl';
import { context } from '../tempContext';
import { propsAndChildren } from '../../../core/typeBlock';
import { template } from './myProfileEdit.tmpl';

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
    type: 'email'
  }),
  inputLogin: new Input({
    placeholder: 'Логин',
    class: 'input--outbord',
    name: 'login',
    value: context.login
  }),
  inputDisplayName: new Input({
    placeholder: 'Отображаемое имя',
    class: 'input--outbord',
    name: 'display_name',
    value: context.display_name
  }),
  inputFirstName: new Input({
    placeholder: 'имя',
    class: 'input--outbord',
    name: 'first_name',
    value: context.first_name
  }),
  inputSecondName: new Input({
    placeholder: 'Фамилия',
    class: 'input--outbord',
    name: 'second_name',
    value: context.second_name
  }),
  inputPhone: new Input({
    placeholder: 'телефон',
    class: 'input--outbord',
    name: 'phone',
    value: context.phone
  }),
  button: new Button({
    value: 'Сохранить',
    class: 'form__button'
  })
}));
