import {
  authorizedPaths, EPATH
} from '../../core/router/namePath';
import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/block/typeBlock';
import { source } from './header.tmpl';
import { router } from '../../core/router/initRouter';
import { EROUTER_EVENTS } from '../../core/router/Router';
import { getWithAuth } from '../../hoc/getWithAuth';
const personIcon = new URL('../../img/person.svg', import.meta.url);
const chatIcon = new URL('../../img/chat.svg', import.meta.url);
class Header_ extends Block {
  constructor(props: TPropsObject) {
    router.on(EROUTER_EVENTS.FLOW_BT, ()=> {
      this.methods.getIconHref();
    });
    const info = {
      data: {
        ...props
      },
      methods: {
        goToPage() {
          const currentPathName = router.getCurrentPath();
          if (currentPathName === EPATH.CHAT) {
            router.go(EPATH.PROFILE);
          } else {
            router.go(EPATH.CHAT);
          }
        },
        getIconHref() {
          const currentPathName = router.getCurrentPath();
          console.log(currentPathName);

          if (currentPathName === EPATH.CHAT) {
            return personIcon.href;
          }
          return chatIcon.href;
        },
        isAuthorizedPaths() {
          return authorizedPaths.includes(window.location.pathname);
        }
      }

    };

    super(info);
  }

  render() {
    return source;
  }
}

export const Header = getWithAuth(Header_);
