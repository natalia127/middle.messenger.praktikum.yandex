import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { SIGNUP } from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { tmplSignIn } from './signIn.tmpl';
import { TPropsObject } from '../../core/typeBlock';
import {
  validateForm,
  validateInput
} from '../../utils/validate';
export class SignIn extends Block {
  constructor(props: TPropsObject) {
    const context = {
      value: 'Sign In',
      hrefSignUp: SIGNUP
    };
    const info = {
      data: {
        ...context,
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        validateInput,
        validateForm
      }
    };
    super(info);
  }

  render() {
    return tmplSignIn;
  }
}
