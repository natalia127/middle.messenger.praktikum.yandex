import { Input } from '../../components/input/input';
import { Block } from '../../core/Block';
import { screenChat } from './screenChat.tmpl';
import { TPropsObject } from '../../core/typeBlock';
import { Avatar } from '../../components/avatar/avatar';

const iconClip = new URL('../../img/clip.svg', import.meta.url);
const iconSend = new URL('../../img/send.svg', import.meta.url);
export class ScreenChat extends Block {
  constructor(props: TPropsObject) {
    const info ={
      data: {
        iconClip: iconClip.href,
        iconSend: iconSend.href,
        ...props
      },
      components: {
        Input,
        Avatar
      }
    }
    const ;
    super(info);
  }

  render() {
    return screenChat;
  }
}
