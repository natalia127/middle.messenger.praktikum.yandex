export const template: string = `<div 
  class="col-lg-12 wrapper-center"
  @handlerClickAvatar="handlerSendFile"
>
  <div class="profile">
    <Avatar 
    ::isChange="true" 
    ::className="profile__avatar avatar-xl"
    ::srcImg=pathAvatar
    />
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
      <div class="profile__action profile__edit"><span @click="goEditProfile">Изменить данные</span></div>
      <div class="profile__action profile__edit" ><span @click="goEditPassword">Изменить пароль</span></div>
      <div class="profile__action profile__exit"><span @click="goExit">Выйти</span></div>
    </div>
  </div>

</div>
`;
