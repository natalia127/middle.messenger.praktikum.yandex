import { CHAT } from '../../../router/namePath';

export const template: string = `<div class="col-lg-12 wrapper-center">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Почта</div>
          {%
            inputEmail
          %}
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Логин</div>
          {%
            inputLogin
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Отображаемое имя</div>
          {%
            inputDisplayName
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Имя</div>
          {% inputFirstName %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Фамилия</div>
          {% inputSecondName %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Телефон</div>
          {% inputPhone %}
        </div>

      </div>
      
      <div class="profile__actions profile__actions--center">
        <a href="${CHAT}">
          {% button %}
        </a>
      </div>
    </div>
    
  </div>
  `;
