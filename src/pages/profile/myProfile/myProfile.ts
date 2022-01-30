import { Avatar } from '../../../components/avatar/avatar';
import { template } from './myProfile.tmpl';
import { Block } from '../../../core/Block';
import { TPropsAndChildren } from '../../../core/typeBlock';

import { context } from '../tempContext';

class MyProfile extends Block {
  constructor(props: TPropsAndChildren) {
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
      class: 'profile__avatar',
      isChange: true
    })

  });
};
