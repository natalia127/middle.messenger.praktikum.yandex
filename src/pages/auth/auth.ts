import { SignIn } from './signIn/signIn';
import { SignUp } from './signUp/signUp';
import { Block } from '../../core/block/Block';
import { TPropsObject } from '../../core/block/typeBlock';
import { router } from '../../core/router/initRouter';
import { EPATH } from '../../core/router/namePath';
export class Auth extends Block {
  constructor(props: TPropsObject) {
    const info = {
      data: {
        ...props
      },
      components: {
        SignIn,
        SignUp
      },
      methods: {

      }
    };
    super(info);
  }

  render() {
    const form : string = router.getCurrentPath() === EPATH.SIGNIN ? 'SignIn' : 'SignUp';

    return `
    <div class="col-lg-12 wrapper-center"><${form} /></div>
    `;
  }
}
