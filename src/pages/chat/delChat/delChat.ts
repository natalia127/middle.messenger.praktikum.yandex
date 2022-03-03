import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { tmpl } from './delChat.tmpl';
import { chatController } from '../../../core/controllers/chatController';

export class DelChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        idActiveChat: null,
        isError: false,
        nameChat: null,
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        async handlerDelChat(e: Event) {
          e.preventDefault();
          let isSuccessfully = await chatController.delChat({
            chatId: this.props.idActiveChat
          });
          if (isSuccessfully) {
            let eventHideModal = new Event('hideModal', { bubbles: true });

            this.getContent().dispatchEvent(eventHideModal);
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
