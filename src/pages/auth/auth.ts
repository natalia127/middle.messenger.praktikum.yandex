import { SignIn } from '../../modules/signIn/signIn';
import { SignUp } from '../../modules/signUp/signUp';
import { SIGNIN } from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { TPropsObject } from '../../core/typeBlock';

const form : string = window.location.pathname === SIGNIN ? 'SignIn' : 'SignUp';

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
    return `
    <div class="col-lg-12 wrapper-center"><${form} /></div>
    `;
  }
}
