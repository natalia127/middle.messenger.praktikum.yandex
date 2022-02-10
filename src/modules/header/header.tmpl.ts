export const source = `
      <header class='header'>
        {% if isAuthorizedPaths %}
          <div class="container header__container">
              <span class="linkProfile">
                <span @click="toPage" class="linkProfile__link"><img ::src=getIconHref alt=" " /></span>
              </span>
              <span class='header__logo'>красивый лого</span>
          </div>  
        {% endif %}    
      </header>
   `;
