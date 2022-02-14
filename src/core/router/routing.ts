import {
  EPATH
} from './namePath';
import { MyProfile } from '../../pages/profile/myProfile/myProfile';
import { MyProfileEdit } from '../../pages/profile/myProfileEdit/myProfileEdit';
import { PasswordEdit } from '../../pages/profile/passwordEdit/passwordEdit';
import { Chat } from '../../pages/chat/chat';
import { Page404 } from '../../pages/error/page404';
import { Page500 } from '../../pages/error/page500';
import { Auth } from '../../pages/auth/auth';
import { router } from './initRouter';

export function registerRouts() {
  router.use(EPATH.CHAT, Chat);
  router.use(EPATH.PROFILE, MyProfile);
  router.use(EPATH.EDIT_PROFILE, MyProfileEdit);
  router.use(EPATH.EDIT_PASSWORD, PasswordEdit);
  router.use(EPATH.SIGNIN, Auth);
  router.use(EPATH.SIGNUP, Auth);
}
export function getComponentTmpl() {
  router.start();
}
