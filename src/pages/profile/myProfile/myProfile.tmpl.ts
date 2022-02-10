import { SIGNIN, EDIT_PROFILE, EDIT_PASSWORD } from '../../../core/router/namePath';

export const template: string = `<div class="col-lg-12 wrapper-center">
  <div class="profile">
    <Avatar ::isChange="true" ::className="profile__avatar avatar-xl"/>
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
