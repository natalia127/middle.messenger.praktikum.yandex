import { Avatar } from '../../../components/avatar/avatar';
import { template } from './myProfile.tmpl';
import { Block } from '../../../core/Block';
import { TPropsObject } from '../../../core/typeBlock';
import { context } from '../tempContext';
import { router } from '../../../core/router/initRouter';
import { EPATH } from '../../../core/router/namePath';

export class MyProfile extends Block {
  constructor(props: TPropsObject) {
    const info = {
      components: {
        Avatar
      },
      data: {
        ...context,
        ...props
      },
      methods: {
        goEditProfile() {
          router.go(EPATH.EDIT_PROFILE);
        },
        goEditPassword() {
          router.go(EPATH.EDIT_PASSWORD);
        },
        goExit() {
          router.go(EPATH.SIGNIN);
        }
      }
    };
    super(info);
  }

  render() {
    return template;
  }
}
