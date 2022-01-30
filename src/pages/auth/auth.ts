import signIn from '../../modules/signIn/signIn';
import signUp from '../../modules/signUp/signUp';
import { SIGNIN } from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';

const form : string = window.location.pathname === SIGNIN ? 'signIn' : 'signUp';

export class Auth extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render() {
    return `
    <div class="col-lg-12 wrapper-center">{% ${form} %}</div>
    `;
  }
}

export default ()=> (new Auth({ signIn: signIn(), signUp: signUp() }));
