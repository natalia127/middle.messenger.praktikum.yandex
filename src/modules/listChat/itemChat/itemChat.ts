import { Block } from '../../../core/Block';
import { propsAndChildren } from '../../../core/typeBlock';
import { itemChat } from './itemChat.tmpl';

export class ItemChat extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render(): string {
    return itemChat;
  }
}
