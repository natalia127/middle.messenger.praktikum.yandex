import { Input } from '../../../components/input/input';
import { Block } from '../../../core/Block';

import { Button } from '../../../components/button/button';
import { context } from '../tempContext';
import { TPropsObject } from '../../../core/typeBlock';
import { template } from './myProfileEdit.tmpl';
import { validateForm, validateInput } from '../../../utils/validate';
export class MyProfileEdit extends Block {
  constructor(props: TPropsObject) {
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
    return template;
  }
}
