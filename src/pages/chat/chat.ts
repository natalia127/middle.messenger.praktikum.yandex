import { ListChat } from '../../modules/listChat/listChat';
import { ProfileChat } from '../../modules/profileChat/profileChat';
import { SettingsChat } from '../../modules/settingsChat/settingsChat';
import { ScreenChat } from '../../modules/screenChat/screenChat';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';
import { chat } from './chat.tmpl';
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
        ...props
      },
      components: {
        ListChat,
        ScreenChat,
        ProfileChat,
        SettingsChat
      },
      methods: {
        handlerClick: function () {
          let isProfileChat = !this.props.isProfileChat;
          this.setProps({ isProfileChat });
        }
      }
    };
    super(info);
  }

  render(): string {
    return chat;
  }
}
