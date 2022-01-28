import { Avatar } from '../../components/avatar/avatar';
import { profileChatTmpl } from './profileChat.tmpl';
import { Block } from '../../core/Block';
import { propsAndChildren } from '../../core/typeBlock';

export class ProfileChat extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render() {
    return profileChatTmpl;
  }
}

export default ()=> (new ProfileChat(
  {
    avatar: new Avatar({ size: '3em' }),
    avatar1: new Avatar({ })

  }
));
