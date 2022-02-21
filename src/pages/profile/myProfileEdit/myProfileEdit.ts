import { Input } from '../../../components/input/input';
import { Block } from '../../../core/block/Block';

import { Button } from '../../../components/button/button';
import { TPropsObject } from '../../../core/block/typeBlock';
import { template } from './myProfileEdit.tmpl';
import { validateAndSend } from '../../../core/utils/validate';
import { userStore } from '../../../core/store/UserStore';
import { userController } from '../../../core/controllers/userController';
import { StoreEvents } from '../../../core/store/StoreBase';
import { getWithUserDate } from '../../../hoc/getWithUserDate';
class FormMyProfileEdit extends Block {
  constructor(props: TPropsObject) {
    const dataUser = userStore.getState();

    userStore.on(StoreEvents.Updated, ()=> {
      this.setProps(userStore.getState());
    });
    const info = {
      data: {
        ...dataUser,
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        handlerForm(e: Event) {
          e.preventDefault();
          validateAndSend(this, userController, 'changeUser');
        }
      }
    };
    super(info);
  }

  render() {
    return template;
  }
}

export const MyProfileEdit = getWithUserDate(FormMyProfileEdit);
