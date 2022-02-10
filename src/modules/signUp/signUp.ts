import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';
import { tmplSignUp } from './signUp.tmpl';
import { validateForm, validateInput } from '../../utils/validate';

export class SignUp extends Block {
  constructor(props: TPropsObject) {
    const context = {
      value: 'Sign Up'
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
    return tmplSignUp;
  }
}
