import {SIGNIN, SIGNUP, PROFILE, EDIT_PROFILE, EDIT_PASSWORD, CHAT, PAGE500} from './namePath'
import MyProfile from '../pages/profile/myProfile.tmpl'
import EditProfile from '../pages/profile/myProfileEdit.tmpl'
import EditPassword from '../pages/profile/passwordEdit.tmpl'
import Chat from '../pages/chat/chat.tmpl'
import Page404 from '../pages/error/page404.tmpl'
import Page500 from '../pages/error/page500.tmpl'
import Auth from '../pages/auth/auth.tmpl'


export function getComponentTmpl () {
  let path = location.pathname

  if (path !== CHAT && !path.endsWith('.html')) {
    path += '.html'
  }
  let componentTmpl
  switch (path) {
    case PROFILE:
      componentTmpl = MyProfile
      break;
    case EDIT_PROFILE:
      componentTmpl = EditProfile      
      break;
    case EDIT_PASSWORD:
      componentTmpl = EditPassword      
      break;
    case CHAT:
      componentTmpl = Chat      
      break;
    case PAGE500:
      componentTmpl = Page500
      break;
    case SIGNIN:
      componentTmpl = Auth
      break;
    case SIGNUP:
      componentTmpl = Auth
      break;
    default:
      componentTmpl = Page404      

      break;
  }
  return componentTmpl

}
