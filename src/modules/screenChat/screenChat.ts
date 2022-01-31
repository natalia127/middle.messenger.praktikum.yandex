import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { screenChat } from './screenChat.tmpl';
import { TPropsAndChildren } from '../../core/typeBlock';
import { Avatar } from '../../components/avatar/avatar';

const iconClip = new URL('../../img/clip.svg', import.meta.url);
const iconSend = new URL('../../img/send.svg', import.meta.url);
class ScreenChat extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render() {
    return screenChat;
  }
}

export default ()=> (new ScreenChat({
  Input: new Input({
    placeholder: 'Написать сообщение',
    class: 'screenChat__print',
    type: 'text',
    name: 'message'
  }),
  iconClip: iconClip.href,
  iconSend: iconSend.href,
  avatar1: new Avatar({ size: '2.5em' }),
  avatar2: new Avatar({ size: '2.5em' })
}));
