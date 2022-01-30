import {PROFILE, CHAT, authorizedPaths} from '../../router/namePath'

const context = {
  isAuthorizedPaths: authorizedPaths.includes(location.pathname)  
};

const personIcon = new URL('../../img/person.svg', import.meta.url);
const chatIcon = new URL('../../img/chat.svg', import.meta.url);
const icon = location.pathname === CHAT ? personIcon : chatIcon
const href = location.pathname === CHAT ? PROFILE : CHAT
const header = `{% if isAuthorizedPaths %}
  <div class='header'>
    <div class="container">      
        <span class="linkProfile">      
            <a href="${href}"><img src="${icon.href}" alt=" " /></a>
        </span>
    </div>
  </div>
{% endif %}
`

const blockTemplate = function() {
  return `${header}`;
}

export  default {
  blockTemplate,
  context,
}