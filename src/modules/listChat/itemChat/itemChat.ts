import { Block } from '../../../core/Block';
import { TPropsAndChildren } from '../../../core/typeBlock';
import { itemChat } from './itemChat.tmpl';

export class ItemChat extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render(): string {
    return itemChat;
  }
}
