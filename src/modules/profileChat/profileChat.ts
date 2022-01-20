import { Avatar } from '../../components/avatar/avatar.tmpl';
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

export default ()=> (new ProfileChat({ Avatar: new Avatar({}) }));
