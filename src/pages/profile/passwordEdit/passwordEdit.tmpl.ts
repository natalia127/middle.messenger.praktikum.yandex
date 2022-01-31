export const template: string = `<form class="col-lg-12 wrapper-center">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Старый пароль</div>
          {% inputPassword %}
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Новый пароль</div>
          {% inputNewPassword %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Новый пароль еще раз</div>
          {% inputRepeatPassword %}
        </div>



      </div>
      
      <div class="profile__actions profile__actions--center">

          {% button %}

      </div>
    </div>    
  </form>
  `;
