import { Avatar } from '../../components/avatar/avatar';
import { profileChatTmpl } from './profileChat.tmpl';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';

export class ProfileChat extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        ...props
      },
      components: {
        Avatar
      }
    };
    super(info);
  }

  render() {
    return profileChatTmpl;
  }
}
