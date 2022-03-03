import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { tmpl } from './addUser.tmpl';
import {
  validateAndSend
} from '../../../core/utils/validate';
import { chatController } from '../../../core/controllers/chatController';
import { userController } from '../../../core/controllers/userController';
import { userStore } from '../../../core/store/UserStore';

export class AddUserChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        idActiveChat: null,
        isError: false,
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        async handlerAddUserChat(e: Event) {
          e.preventDefault();

          let isCancel = await validateAndSend(this, userController, 'searchUser');

          if (isCancel) {
            const resultSearchUser = userStore.getState().resultSearchUser;
            if (!resultSearchUser.id) {
              return;
            }
            const isSuccessfully = await chatController.addUsersChat({
              users: [resultSearchUser.id],
              chatId: this.props.idActiveChat
            });

            if (isSuccessfully) {
              let event = new Event('hideModal', { bubbles: true });
              this.getContent().dispatchEvent(event);
            } else {
              this.setProps({
                isError: true
              });
            }
          }
        }
      }
    };
    super(info);
  }

  render(): string {
    return tmpl;
  }
}
