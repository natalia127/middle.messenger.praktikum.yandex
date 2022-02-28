import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { getTmpl } from './settingsChat.tmpl';
import { chatStore } from '../../../core/store/ChatStore';
import { ItemSettingsUserChat } from './itemSettingsUserChat';
import { mainUrlForStatic } from '../../../core/http/http';
import { Avatar } from '../../../components/avatar/avatar';
import { chatController } from '../../../core/controllers/chatController';
import { getWithInfoChat } from '../../../hoc/getWithInfoChat';

const iconPlus = new URL('../../../img/account-plus.svg', import.meta.url);
const iconMinusChat = new URL('../../../img/account-multiple-minus.svg', import.meta.url);

class SettingsChat_ extends Block {
  constructor(props: TPropsObject) {
    super({
      data: {
        iconPlus: iconPlus.href,
        iconMinusChat: iconMinusChat.href,
        idChat: null,
        pathAvatar: '',
        ...props
      },
      components: {
        ItemSettingsUserChat,
        Avatar
      },
      methods: {
        addUserChat() {
          let event = new Event('addUserChat', { bubbles: true });
          this.getContent().dispatchEvent(event);
        },
        delChat() {
          let event = new Event('delChat', { bubbles: true });
          this.getContent().dispatchEvent(event);
        },
        handlerSendFile(e:CustomEvent) {
          chatController.changeAvatar({
            file: e.detail.file,
            chatId: Number(this.props.idChat)
          });
        }
      }
    });
  }

  render() {
    let usersChat = '';
    const infoUsersChat = chatStore.getState().chatsUser[this.props.idChat];
    if (infoUsersChat) {
      usersChat = infoUsersChat.reduce((acc: string, infoUser) => {
        const pathAvatar = infoUser.avatar ? mainUrlForStatic + infoUser.avatar : '';
        acc += `
          <ItemSettingsUserChat 
            ::login="${infoUser.displayName || infoUser.login}"
            ::idUser="${infoUser.id}"
            ::pathAvatar="${pathAvatar}"
          /> 
        `;
        return acc;
      }, '');
    }
    return getTmpl(usersChat);
  }
}

export const SettingsChat = getWithInfoChat(SettingsChat_);
