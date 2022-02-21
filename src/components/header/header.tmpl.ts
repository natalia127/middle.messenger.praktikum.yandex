export const source = `
      <header class='header'>
        <div t-if="isAuthorizedPaths" class="container header__container">
            <span class="linkProfile">
              <span @click="goToPage" class="linkProfile__link"><img ::src=getIconHref alt=" " /></span>
            </span>
            <span class='header__logo'>красивый лого</span>
        </div>
      </header>
   `;
