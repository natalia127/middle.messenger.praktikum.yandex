import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';
import { tmplSignUp } from './signUp.tmpl';
import { validateForm, validateInput } from '../../utils/validate';

export class SignUp extends Block {
  constructor(props: TPropsAndChildren) {
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
    name: 'first_name',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputSecondName: new Input({
    placeholder: 'Фамилия',
    class: 'input--withBord form__input',
    name: 'second_name',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputLogin: new Input({
    placeholder: 'Логин',
    class: 'input--withBord form__input',
    name: 'login',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputEmail: new Input({
    placeholder: 'e-mail',
    class: 'input--withBord form__input',
    type: 'email',
    name: 'email',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputPhone: new Input({
    placeholder: 'телефон',
    class: 'input--withBord form__input',
    type: 'number',
    name: 'phone',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  inputPassword: new Input({
    placeholder: 'пароль',
    class: 'input--withBord form__input',
    type: 'password',
    name: 'password',
    events: {
      blur: validateInput,
      focus: validateInput
    }
  }),
  button: new Button({
    value: 'Зарегестрироваться',

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
