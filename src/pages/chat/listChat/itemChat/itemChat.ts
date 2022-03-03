import { Block } from '../../../../core/block/Block';
import { TPropsObject } from '../../../../core/block/typeBlock';
import { itemChat } from './itemChat.tmpl';
import { Avatar } from '../../../../components/avatar/avatar';

export class ItemChat extends Block {
  constructor(props: TPropsObject) {
    super({
      data: props,
      components: {
        Avatar

      },
      methods: {
        selectChat() {
          let event = new CustomEvent('selectChat', {
            bubbles: true,
            detail: {
              idChat: this.props.id,
              nameChat: this.props.name
            }
          });
          this.getContent().dispatchEvent(event);
        }
      }
    });
  }

  render(): string {
    return itemChat;
  }
}
