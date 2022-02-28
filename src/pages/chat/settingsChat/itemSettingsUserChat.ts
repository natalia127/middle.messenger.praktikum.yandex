import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { Avatar } from '../../../components/avatar/avatar';
const iconMinus = new URL('../../../img/account-minus.svg', import.meta.url);
export class ItemSettingsUserChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        idUser: null,
        iconMinus: iconMinus.href,
        pathAvatar: '',
        login: '',
        ...props
      },
      components: {
        Avatar
      },
      methods: {
        async handlerDelUserChat() {
          let event = new CustomEvent('delUserChat', {
            bubbles: true,
            detail: {
              idUser: this.props.idUser,
              login: this.props.login
            }
          });
          this.getContent().dispatchEvent(event);
        }
      }
    };
    super(info);
  }

  render(): string {
    return `
      <li class="settingsChat__participant">
        <div class="settingsChat__icon settingsChat__iDelParty" @click="handlerDelUserChat"> 
          <img src="{{iconMinus}}" alt="" />
        </div>
        
        <div class="settingsChat__imgParticipant">
          <Avatar 
              ::className='avatar-xs'
              ::srcImg=pathAvatar
            />
        </div>

        <div>{{ login }}</div>
      </li>`;
  }
}
