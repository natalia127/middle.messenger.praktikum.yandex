import { PROFILE, CHAT, authorizedPaths } from '../../core/router/namePath';
import { Block } from '../../core/Block';
import { TPropsAndChildren } from '../../core/typeBlock';
const personIcon = new URL('../../img/person.svg', import.meta.url);
const chatIcon = new URL('../../img/chat.svg', import.meta.url);
export class Header extends Block {
  constructor(props: TPropsAndChildren) {
    super(props);
  }

  render() {
    const source = `
      <header class='header'>
      {% if isAuthorizedPaths %}
        <div class="container header__container">
            <span class="linkProfile">
              <a href="{{ href }}"><img src="{{ iconHref }}" alt=" " /></a>
            </span>
            <span class='header__logo'>красивый лого</span>
        </div>  
        {% endif %}    
      </header>
   `;
    return source;
  }
}
export default new Header({
  isAuthorizedPaths: authorizedPaths.includes(window.location.pathname),
  href: window.location.pathname === CHAT ? PROFILE : CHAT,
  iconHref: window.location.pathname === CHAT ? personIcon.href : chatIcon.href
});
