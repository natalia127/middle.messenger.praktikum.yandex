import {
  PROFILE, CHAT, authorizedPaths, EPATH
} from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';
import { source } from './header.tmpl';
import { Router } from '../../core/router/Router';
const personIcon = new URL('../../img/person.svg', import.meta.url);
const chatIcon = new URL('../../img/chat.svg', import.meta.url);
export class Header extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        isAuthorizedPaths: authorizedPaths.includes(window.location.pathname),
        iconHref: window.location.pathname === CHAT ? personIcon.href : chatIcon.href,
        ...props
      },
      methods: {
        toPage: ()=> {
          const router = new Router();

          const currentPathName = router.getCurrentPath();
          if (currentPathName === EPATH.CHAT) {
            router.go(EPATH.PROFILE);
          } else {
            router.go(EPATH.CHAT);
          }
          this.methods.getIconHref();
        },
        getIconHref: function () {
          const router = new Router();
          console.log(router);

          const currentPathName = router.getCurrentPath();
          if (currentPathName === EPATH.CHAT) {
            return personIcon.href;
          }
          return chatIcon.href;
        }
      }
    };

    super(info);
  }

  render() {
    return source;
  }
}
