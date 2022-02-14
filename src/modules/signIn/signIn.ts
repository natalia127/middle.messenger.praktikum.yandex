import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { tmplSignIn } from './signIn.tmpl';
import { TPropsObject } from '../../core/typeBlock';
import {
  validateForm,
  validateInput
} from '../../utils/validate';
import { router } from '../../core/router/initRouter';
import { EPATH } from '../../core/router/namePath';
export class SignIn extends Block {
  constructor(props: TPropsObject) {
    const context = {
      value: 'Sign In'
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
        validateForm,
        goSignUp() {
          router.go(EPATH.SIGNUP);
        }
      }
    };
    super(info);
  }

  render() {
    return tmplSignIn;
  }
}
