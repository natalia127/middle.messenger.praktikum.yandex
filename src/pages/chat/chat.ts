import { ListChat } from './listChat/listChat';
import { ProfileChat } from './profileChat/profileChat';
import { SettingsChat } from './settingsChat/settingsChat';
import { ScreenChat } from './screenChat/screenChat';
import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/block/typeBlock';
import { chat } from './chat.tmpl';
import { AddChat } from './addChat/addChat';
import { AddUserChat } from './addUserChat/addUserChat';
import { DelUserChat } from './delUserChat/delUserChat';
import { DelChat } from './delChat/delChat';
import { Blackout } from '../../components/blackout/blackout';
import { chatController } from '../../core/controllers/chatController';
const iSetting = new URL('../../img/cog-outline.svg', import.meta.url);
const iProfileChat = new URL('../../img/account-group.svg', import.meta.url);
export class Chat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        iSetting: iSetting.href,
        iProfileChat: iProfileChat.href,
        classIcon: ' ',
        isProfileChat: true,
        idActiveChat: null,
        nameActiveChat: null,
        needAddChat: false,
        needAddUserChat: false,
        needBlackout: false,
        needDelUserChat: false,
        needDelChat: false,
        loginDelChat: '',
        idDelUser: null,
        ...props
      },
      components: {
        ListChat,
        ScreenChat,
        ProfileChat,
        SettingsChat,
        AddChat,
        Blackout,
        AddUserChat,
        DelUserChat,
        DelChat
      },
      methods: {
        changeScreenInfoChat() {
          let isProfileChat = !this.props.isProfileChat;
          this.setProps({ isProfileChat });
        },
        showAddChat() {
          this.setProps({
            needAddChat: true,
            needBlackout: true
          });
        },
        showAddUserChat() {
          this.setProps({
            needAddUserChat: true,
            needBlackout: true
          });
        },
        showDelUserChat(e: CustomEvent) {
          this.setProps({
            needDelUserChat: true,
            needBlackout: true,
            loginDelChat: e.detail.login,
            idDelUser: e.detail.idUser
          });
        },
        showDelChat() {
          this.setProps({
            needDelChat: true,
            needBlackout: true
          });
        },
        hideModal() {
          this.setProps({
            needAddChat: false,
            needBlackout: false,
            needAddUserChat: false,
            needDelUserChat: false,
            needDelChat: false
          });
        },
        async selectChat(e: CustomEvent) {
          const idChat = e.detail.idChat;
          if (idChat && this.props.idActiveChat !== idChat) {
            await chatController.getUsersChat(idChat);

            this.setProps({
              idActiveChat: idChat,
              nameActiveChat: e.detail.nameChat
            });
            console.log(this.props);
          }
        }
      }
    };
    super(info);
  }

  render(): string {
    return chat;
  }
}
