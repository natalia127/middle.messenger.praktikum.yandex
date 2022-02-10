import { CHAT } from '../../../core/router/namePath';

export const template: string = `<form class="col-lg-12 wrapper-center" @submit="validateForm">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Почта</div>
          <Input 
            ::placeholder="e-mail"
            ::class="input--outbord"
            ::name='email'
            ::type='email'
            ::value=email
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Логин</div>
          <Input 
            ::placeholder="Логин"
            ::class="input--outbord"
            ::name='login'
            ::value=login
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Отображаемое имя</div>
          <Input 
            ::placeholder="Отображаемое имя"
            ::class="input--outbord"
            ::name='display_name'
            ::value=display_name
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Имя</div>
          <Input 
            ::placeholder="имя"
            ::class="input--outbord"
            ::name='first_name'
            ::value=first_name
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Фамилия</div>
          <Input 
            ::placeholder="Фамилия"
            ::class="input--outbord"
            ::name='second_name'
            ::value=second_name
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Телефон</div>
          <Input 
            ::placeholder="Телефон"
            ::class="input--outbord"
            ::name='phone'
            ::type='number'
            ::value=phone
            @blur="validateInput"
            @focus="validateInput"
          />
        </div>

      </div>
      
      <div class="profile__actions profile__actions--center">
        <a href="${CHAT}">
          <Button 
          ::value='Сохранить'
          ::class='form__button'
          />
        </a>
      </div>
    </div>
    
  </form>
  `;
