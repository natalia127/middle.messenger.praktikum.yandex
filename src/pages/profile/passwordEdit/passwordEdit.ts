import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { context } from '../tempContext';
import { Block } from '../../../core/Block';
import { TPropsObject } from '../../../core/typeBlock';
import { validateForm, validateInput } from '../../../utils/validate';
import { template } from './passwordEdit.tmpl';

export class PasswordEdit extends Block {
  constructor(props: TPropsObject) {
    const data = { ...context, ...props };
    super({
      data,
      components: {
        Input,
        Button
      },
      methods: {
        validateForm,
        validateInput
      }
    });
  }

  render() {
    return template;
  }
}
