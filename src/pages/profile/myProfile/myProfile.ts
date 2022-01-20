import { Avatar } from '../../../components/avatar/avatar.tmpl';
import { template } from './myProfile.tmpl';
import { Block } from '../../../core/Block';
import { propsAndChildren } from '../../../core/typeBlock';

import { context } from '../tempContext';

class MyProfile extends Block {
  constructor(props: propsAndChildren) {
    super(props);
  }

  render() {
    return template;
  }
}

export default () => {
  return new MyProfile({
    ...context,
    avatar: new Avatar({
      size: '5em',
      class: 'profile__avatar'
    })

  });
};
