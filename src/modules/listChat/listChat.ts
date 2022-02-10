import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';
import { listChatTmpl } from './listChat.tmpl';
import { ItemChat } from './itemChat/itemChat';

export class ListChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        ...props
      },
      components: {
        Input,
        ItemChat
      }
    };
    super(info);
  }

  render(): string {
    return listChatTmpl;
  }
}
