import { Button } from '../../components/button/button.tmpl';
import { Input } from '../../components/input/input.tmpl';
import { CHAT } from '../../router/namePath';
import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';
import { tmplSignUp } from './signUp.tmpl';

export class SignUp extends Block {
  constructor(props: propsAndChildren) {
    const context = {
      value: 'Sign Up'
    };
    const newProps = { ...context, ...props };
    super(newProps);
  }

  render() {
    return tmplSignUp;
  }
}
export default ()=> (new SignUp({
  inputFirstName: new Input({
    placeholder: 'имя',
    class: 'input--withBord form__input',
    name: 'first_name'
  }),
  inputSecondName: new Input({
    placeholder: 'Фамилия',
    class: 'input--withBord form__input',
    name: 'second_name'
  }),
  inputLogin: new Input({
    placeholder: 'Логин',
    class: 'input--withBord form__input',
    name: 'login'
  }),
  inputEmail: new Input({
    placeholder: 'e-mail',
    class: 'input--withBord form__input',
    type: 'email',
    name: 'email'
  }),
  inputPhone: new Input({
    placeholder: 'телефон',
    class: 'input--withBord form__input',
    type: 'number',
    name: 'phone'
  }),
  inputPassword: new Input({
    placeholder: 'пароль',
    class: 'input--withBord form__input',
    type: 'password',
    name: 'password'
  }),
  button: new Button({
    value: `<a href="${CHAT}">Зарегестрироваться</a>`,
    class: 'form__button'
  })
}));
