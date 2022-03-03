import { Avatar } from '../../../components/avatar/avatar';
import { template } from './myProfile.tmpl';
import { Block } from '../../../core/block/Block';
import { TPropsObject } from '../../../core/block/typeBlock';
import { router } from '../../../core/router/initRouter';
import { EPATH } from '../../../core/router/namePath';
import { authController } from '../../../core/controllers/authController';
import { userStore } from '../../../core/store/UserStore';
import { StoreEvents } from '../../../core/store/StoreBase';
import { mainUrlForStatic } from '../../../core/http/http';
import { userController } from '../../../core/controllers/userController';
export class MyProfile extends Block {
  constructor(props: TPropsObject) {
    const dataUser = userStore.getState();
    userStore.on(StoreEvents.Updated, ()=> {
      const newProps: TPropsObject = { ...userStore.getState() };

      if (newProps.avatar) {
        newProps.pathAvatar = mainUrlForStatic + newProps.avatar;
      }

      this.setProps(newProps);
    });

    const pathAvatar = dataUser.avatar ? mainUrlForStatic + dataUser.avatar : null;

    const info = {
      components: {
        Avatar
      },
      data: {
        ...dataUser,
        pathAvatar,
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
          authController.logout();
        },
        handlerSendFile(e:CustomEvent) {
          userController.changeAvatar(e.detail.file);
        }
      }
    };
    super(info);
  }

  render() {
    return template;
  }
}
