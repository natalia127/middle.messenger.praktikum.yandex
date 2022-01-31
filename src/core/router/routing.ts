import {
  SIGNIN, SIGNUP, PROFILE, EDIT_PROFILE, EDIT_PASSWORD, CHAT, PAGE500
} from './namePath';
import MyProfile from '../../pages/profile/myProfile/myProfile';
import EditProfile from '../../pages/profile/myProfileEdit/myProfileEdit';
import EditPassword from '../../pages/profile/passwordEdit/passwordEdit';
import Chat from '../../pages/chat/chat';
import Page404 from '../../pages/error/page404';
import Page500 from '../../pages/error/page500';
import Auth from '../../pages/auth/auth';
import { IBlock } from '../typeBlock';

export function getComponentTmpl() {
  let path: string = window.location.pathname;

  if (path !== CHAT && !path.endsWith('.html')) {
    path += '.html';
  }
  let block: IBlock;
  switch (path) {
    case PROFILE:
      block = MyProfile();
      break;
    case EDIT_PROFILE:
      block = EditProfile();
      break;
    case EDIT_PASSWORD:
      block = EditPassword();
      break;
    case CHAT:
      block = Chat();
      break;
    case PAGE500:
      block = Page500();
      break;
    case SIGNIN:
      block = Auth();
      break;
    case SIGNUP:
      block = Auth();
      break;
    default:
      block = Page404();

      break;
  }

  return block;
}
