import { chatStore } from '../core/store/ChatStore';
import { StoreEvents } from '../core/store/StoreBase';
import {
  TPropsObject, Constructable, IBlock
} from '../core/block/typeBlock';
import { mainUrlForStatic } from '../core/http/http';

const findChat = (idChat: number) => {
  return chatStore.getState().chats.find((chat)=> chat.id === +idChat);
};
const getPathAvatar = (pathAvatar: string) => {
  return pathAvatar ? mainUrlForStatic + pathAvatar : '';
};
export function getWithInfoChat(Component: Constructable<IBlock>) {
  return class extends Component {
    constructor(props: TPropsObject) {
      super(props);

      chatStore.on(StoreEvents.Updated, () => {
        const infoChat = findChat(this.props.idChat);
        if (infoChat) {
          const pathAvatar = getPathAvatar(infoChat.avatar);

          this.setProps({ pathAvatar });
        }
      });
    }

    componentDidUpdate(oldProps, newProps) {
      if (!newProps.idChat || newProps.pathAvatar) return true;
      const infoChat = findChat(newProps.idChat);
      if (!infoChat.avatar) {
        return true;
      }
      if (infoChat && infoChat.avatar) {
        this.setProps({ pathAvatar: getPathAvatar(infoChat.avatar) });
      }
      return false;
    }
  };
}
