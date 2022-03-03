import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { validateAndSend } from '../../../core/utils/validate';
import { template } from './passwordEdit.tmpl';
import { userController } from '../../../core/controllers/userController';
import { getWithUserDate } from '../../../hoc/getWithUserDate';

class FormPasswordEdit extends Block {
  constructor(props: TPropsObject) {
    const data = { ...props };
    super({
      data,
      components: {
        Input,
        Button
      },
      methods: {
        handlerForm(e: Event) {
          e.preventDefault();
          validateAndSend(this, userController, 'changePassword');
        }
      }
    });
  }

  render() {
    return template;
  }
}
export const PasswordEdit = getWithUserDate(FormPasswordEdit);
