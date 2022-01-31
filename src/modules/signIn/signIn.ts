import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { SIGNUP, CHAT } from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { tmplSignIn } from './signIn.tmpl';
import { TPropsAndChildren } from '../../core/typeBlock';
import {
  validateForm,
  validateInput
} from '../../utils/validate';
export class SignIn extends Block {
  constructor(props: TPropsAndChildren) {
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
    name: 'login',
    events: {
      blur: validateInput
    }
  }),
  inputPassword: new Input({
    placeholder: 'пароль',
    class: 'input--withBord form__input',
    type: 'password',
    name: 'password',
    events: {
      blur: validateInput
    }
  }),
  button: new Button({
    value: 'Войти',
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
