import Avatar from '../../components/avatar/avatar.tmpl'
import {SIGNIN, EDIT_PROFILE, EDIT_PASSWORD } from '../../router/namePath'

import { context } from './tempContext';

const blockTemplate = function() {

  return `<div class="col-lg-12 wrapperCenter">
    <div class="profile">
      {% Avatar 
        context: {
          size: '5em',
          class: 'profile__avatar'
        }
      %}
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Почта</div>
          <div class="profile__itemInfo">{{ email }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Логин</div>
          <div class="profile__itemInfo">{{ login }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Отображаемое имя</div>
          <div class="profile__itemInfo">{{ display_name }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Имя</div>
          <div class="profile__itemInfo">{{ first_name }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Фамилия</div>
          <div class="profile__itemInfo">{{ second_name }}</div>
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Телефон</div>
          <div class="profile__itemInfo">{{ phone }}</div>
        </div>

      </div>
      
      <div class="profile__actions">
        <div class="profile__action profile__edit"><a href="${EDIT_PROFILE}">Изменить данные</a></div>
        <div class="profile__action profile__edit" ><a href="${EDIT_PASSWORD}">Изменить пароль</a></div>
        <div class="profile__action profile__exit"><a href="${SIGNIN}">Выйти</a></div>
      </div>
    </div>
    
  </div>
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    Avatar
  }
}
