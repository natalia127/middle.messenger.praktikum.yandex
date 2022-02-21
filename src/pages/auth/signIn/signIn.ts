import { Button } from '../../../components/button/button';
import { Input } from '../../../components/input/input';
import { Block } from '../../../core/block/Block';
import { tmplSignIn } from './signIn.tmpl';
import { TPropsObject } from '../../../core/block/typeBlock';
import {
  validateAndSend
} from '../../../core/utils/validate';
import { router } from '../../../core/router/initRouter';
import { EPATH } from '../../../core/router/namePath';
import { authController } from '../../../core/controllers/authController';
import { getWithAuth } from '../../../hoc/getWithAuth';

class FormSignIn extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        value: 'Sign In',
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        signIn(e: Event) {
          e.preventDefault();
          validateAndSend(this, authController, 'signIn');
        },
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

export const SignIn = getWithAuth(FormSignIn);
