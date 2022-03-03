import { Input } from '../../../components/input/input';
import { Block } from '../../../core/block/Block';
import { getScreenChat } from './screenChat.tmpl';
import { TPropsObject } from '../../../core/block/typeBlock';
import { Avatar } from '../../../components/avatar/avatar';
import { chatStore } from '../../../core/store/ChatStore';
import { userStore } from '../../../core/store/UserStore';
import { chatController } from '../../../core/controllers/chatController';
import { StoreEvents } from '../../../core/store/StoreBase';
import { mainUrlForStatic } from '../../../core/http/http';

const iconClip = new URL('../../../img/clip.svg', import.meta.url);
const iconSend = new URL('../../../img/send.svg', import.meta.url);

let timeLastMessage: number = Date.now();
export class ScreenChat extends Block {
  private currentMessage = '';

  private currentIdUser: number;

  constructor(props: TPropsObject) {
    super({
      data: {
        iconClip: iconClip.href,
        iconSend: iconSend.href,
        idChat: null,
        messages: [],
        ...props
      },
      components: {
        Input,
        Avatar
      },
      methods: {
        handlerPrintMessage(e: CustomEvent) {
          this.currentMessage = e.detail.value;
        },
        handlerSendMessage() {
          if (!this.currentMessage) {
            return;
          }
          const timeNow = Date.now();
          if (timeNow - timeLastMessage > 1000) {
            const socket = chatStore.getState().chatsConnect[this.props.idChat];
            socket.send(JSON.stringify({
              content: this.currentMessage,
              type: 'message'
            }));
            this.currentMessage = '';
          }
        }
      }
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Enter' && !!this.currentMessage) {
        this.methods.handlerSendMessage();
      }
    });
    chatStore.on(StoreEvents.Updated, () => {
      let currentIdUser = userStore.getState().id;
      if (currentIdUser) {
        this.currentIdUser = currentIdUser;
      }
    });

    chatStore.on(StoreEvents.Updated, () => {
      const messages = chatStore.getState().chatsMessages[this.props.idChat];

      if (messages && messages.length) {
        this.setProps({
          messages
        });
      }
    });
  }

  protected async componentDidUpdate(
    oldProps: TPropsObject,
    newProps: TPropsObject
  ): Promise<boolean | Error> {
    if (oldProps.idChat === newProps.idChat) {
      return true;
    }
    await chatController.joinChat(newProps.idChat);

    return false;
  }

  componentReadyUse(): void {
    const screenMessage = this.getContent().querySelector('.js-scroll');
    if (screenMessage) {
      screenMessage.scrollTo(0, screenMessage.scrollHeight);
    }
    const screenInputMessage = this.getContent().querySelector('.js-input');
    if (screenInputMessage) {
      (screenInputMessage as HTMLInputElement).focus();
    }
  }

  render() {
    const messagesChat = chatStore.getState().chatsMessages[this.props.idChat];
    const infoChat = chatStore.getState().chatsUser[this.props.idChat];
    let s = '';
    let lastIdUser: number;

    if (messagesChat) {
      const sr = messagesChat.reduce((_acc, message, index) => {
        let acc = _acc;
        const userId = +message.user_id;
        const infoUser = infoChat.find((user)=> user.id === userId);
        if (!infoUser) {
          return acc;
        }
        let avatar = '';
        if (infoUser.avatar) {
          const pathAvatar = mainUrlForStatic + infoUser.avatar;
          avatar = `
            <Avatar 
              ::srcImg="${pathAvatar}"
            />
          `;
        } else {
          avatar = `
          <Avatar 

          />
        `;
        }

        if (
          (!lastIdUser || lastIdUser !== userId)
          && (index !== messagesChat.length - 1 || messagesChat.length === 1)) {
          acc += `
          <div class="screenChat__wrapperMessages">
            <div class="screenChat__imgProfile">${avatar}</div>
            <div class="screenChat__messages">`;
        }
        lastIdUser = userId;

        let content = message.content || '';

        const isMyMessage = this.currentIdUser === userId;
        let classMyMessage = isMyMessage ? 'screenChat__message-my' : '';
        acc += `
        <div class="screenChat__message ${classMyMessage}">
          ${content}
        </div>`;
        if ((lastIdUser && lastIdUser !== userId) || index === messagesChat.length - 1) {
          acc += '</div> </div>';
        }
        return acc;
      }, '');
      if (sr) {
        s = sr;
      }
    }

    return getScreenChat(s);
  }
}
