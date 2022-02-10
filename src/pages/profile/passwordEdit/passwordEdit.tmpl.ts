export const template: string = `<form class="col-lg-12 wrapper-center"  @submit="validateForm">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Старый пароль</div>
          <Input 
            ::class="input--outbord"
            ::name='oldPassword'
            ::type='password'
            @blur="validateInput"
            @focus="validateInput"
          />
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Новый пароль</div>
          <Input 
            ::class="input--outbord"
            ::name='newPassword'
            ::type='password'
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Новый пароль еще раз</div>
          <Input 
            ::class="input--outbord"
            ::name='repeatPassword'
            ::type='password'
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>



      </div>
      
      <div class="profile__actions profile__actions--center">
        <Button 
        ::value='Сохранить'
        ::class='form__button'
        />
      </div>
    </div>    
  </form>
  `;
