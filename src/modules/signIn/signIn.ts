import { Button } from '../../components/button/button.tmpl';
import { Input } from '../../components/input/input.tmpl';
import { SIGNUP, CHAT } from '../../router/namePath';
import { Block } from '../../core/Block';
import { tmplSignIn } from './signIn.tmpl';
import { propsAndChildren } from '../../core/typeBlock';

export class SignIn extends Block {
  constructor(props: propsAndChildren) {
    const context = {
      value: 'Sign In'
    };
    const newProps = { ...context, ...props };
    super(newProps);
  }

  render() {
    return tmplSignIn;
  }
}

export default ()=> (new SignIn({
  SIGNUP,
  inputLogin: new Input({
    placeholder: 'Логин',
    class: 'input--withBord form__input ',
    name: 'login'
  }),
  inputPassword: new Input({
    placeholder: 'пароль',
    class: 'input--withBord form__input',
    type: 'password',
    name: 'password'
  }),
  button: new Button({
    value: `<a href="${CHAT}">Войти</a>`,
    class: 'form__button'
  })
}));
