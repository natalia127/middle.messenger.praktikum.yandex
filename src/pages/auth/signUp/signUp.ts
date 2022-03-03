import { Button } from '../../../components/button/button';
import { Input } from '../../../components/input/input';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { tmplSignUp } from './signUp.tmpl';
import { authController } from '../../../core/controllers/authController';
import {
  validateAndSend
} from '../../../core/utils/validate';

import { getWithAuth } from '../../../hoc/getWithAuth';

class FormSignUp extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        value: 'Sign Up',
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        signUp(e: Event) {
          e.preventDefault();
          validateAndSend(this, authController, 'signUp');
        }

      }
    };
    super(info);
  }

  render() {
    return tmplSignUp;
  }
}

export const SignUp = getWithAuth(FormSignUp);
