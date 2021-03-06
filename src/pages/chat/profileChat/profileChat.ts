import { Avatar } from '../../../components/avatar/avatar';
import { getTempl } from './profileChat.tmpl';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { chatStore } from '../../../core/store/ChatStore';
import { mainUrlForStatic } from '../../../core/http/http';
import { getWithInfoChat } from '../../../hoc/getWithInfoChat';
class ProfileChat_ extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        idChat: null,
        pathAvatar: '',
        ...props
      },
      components: {
        Avatar
      }
    };
    super(info);
  }

  render() {
    let usersChat = '';
    const infoUsersChat = chatStore.getState().chatsUser[this.props.idChat];

    if (infoUsersChat) {
      usersChat = infoUsersChat.reduce((acc_: string, infoUser) => {
        const pathAvatar = infoUser.avatar ? mainUrlForStatic + infoUser.avatar : '';
        let acc = acc_;
        acc += `
        
        <li class="profileChat__participant">
          <div class="profileChat__imgParticipant "> 
          <Avatar 
            ::className='avatar-xs'
            ::srcImg='${pathAvatar}'
          />
          </div>
          <div>${infoUser.display_name || infoUser.login}</div>
        </li>
      `;
        return acc;
      }, '');
    }

    return getTempl(usersChat);
  }
}

export const ProfileChat = getWithInfoChat(ProfileChat_);
