import { Input } from '../../../components/input/input';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { getTempl } from './listChat.tmpl';
import { ItemChat } from './itemChat/itemChat';
import { chatStore } from '../../../core/store/ChatStore';
import { StoreEvents } from '../../../core/store/StoreBase';
import { mainUrlForStatic } from '../../../core/http/http';
const iconPlus = new URL('../../../img/plus.svg', import.meta.url);

export class ListChat extends Block {
  constructor(props: TPropsObject) {
    chatStore.on(StoreEvents.Updated, () => {
      this.setProps({ needRender: true });
    });
    const info = {
      data: {
        needRender: false,
        iconPlus: iconPlus.href,
        ...props
      },
      components: {
        Input,
        ItemChat
      },
      methods: {
        handlerClickIconAdd() {
          let event = new Event('addChat', { bubbles: true });
          this.getContent().dispatchEvent(event);
        }
      }
    };
    super(info);
  }

  render(): string {
    const itemsChat = chatStore.getState().chats.reduce((acc, item) => {
      const lastMessage = item.last_message ? item.last_message.content : '';
      const unreadCount = item.unread_count || '';
      const pathAvatar = item.avatar ? mainUrlForStatic + item.avatar : '';

      acc += `<ItemChat 
      ::id="${item.id}"
      ::name="${item.title}" 
      ::lastMessage="${lastMessage}" 
      ::countUnRead="${unreadCount}" 
      ::pathAvatar="${pathAvatar}"
      /> \n`;
      return acc;
    }, '');
    return getTempl(itemsChat);
  }
}
