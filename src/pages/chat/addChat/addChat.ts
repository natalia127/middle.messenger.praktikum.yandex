import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { tmpl } from './addChat.tmpl';
import { chatController } from '../../../core/controllers/chatController';
import {
  validateAndSend
} from '../../../core/utils/validate';

export class AddChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        isError: false,
        ...props
      },
      components: {
        Input,
        Button
      },
      methods: {
        async handlerAddChat(e: Event) {
          e.preventDefault();
          let isSuccessfully = await validateAndSend(this, chatController, 'addChat');

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
