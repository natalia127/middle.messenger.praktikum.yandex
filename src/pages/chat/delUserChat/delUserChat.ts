import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { tmpl } from './delUser.tmpl';
import { chatController } from '../../../core/controllers/chatController';

export class DelUserChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        idActiveChat: null,
        login: '',
        idDelUser: null,
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        async handlerDelUserChat(e: CustomEvent) {
          e.preventDefault();

          let isSuccessfully = await chatController.delUsersChat({
            users: [this.props.idDelUser],
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
    };
    super(info);
  }

  render(): string {
    return tmpl;
  }
}
