import { Block } from '../../../core/Block';
import { TPropsObject } from '../../../core/typeBlock';
import { itemChat } from './itemChat.tmpl';

export class ItemChat extends Block {
  constructor(props: TPropsObject) {
    super({ data: props });
  }

  render(): string {
    return itemChat;
  }
}
