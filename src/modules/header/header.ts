import {
  authorizedPaths, EPATH
} from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';
import { source } from './header.tmpl';
import { router } from '../../core/router/initRouter';

const personIcon = new URL('../../img/person.svg', import.meta.url);
const chatIcon = new URL('../../img/chat.svg', import.meta.url);
export class Header extends Block {
  constructor(props: TPropsObject) {
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
          this.methods.getIconHref();
        },
        getIconHref() {
          const currentPathName = router.getCurrentPath();
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

  componentDidMount() {
    router.addAfterCallback(this.methods.isAuthorizedPaths);
  }

  render() {
    return source;
  }
}
