import Input from '../../components/input/input.tmpl'
import Button from '../../components/button/button.tmpl'
import { context } from './tempContext';
import { CHAT } from '../../router/namePath'


const blockTemplate = function() {

  return `<div class="col-lg-12 wrapperCenter">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Почта</div>
          {%
            Input
            context: {
              placeholder: 'e-mail',
              class: 'input--outbord',
              name: 'email', 
              value: email,
              type: 'email'
            }
          %}
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Логин</div>
          {%
            Input
            context: {
              placeholder: 'Логин',
              class: 'input--outbord',
              name: 'login', 
              value: login
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Отображаемое имя</div>
          {%
            Input
            context: {
              placeholder: 'Отображаемое имя',
              class: 'input--outbord',
              name: 'display_name', 
              value: display_name
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Имя</div>
          {%
            Input
            context: {
              placeholder: 'имя',
              class: 'input--outbord',
              name: 'first_name', 
              value: first_name
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Фамилия</div>
          {%
            Input
            context: {
              placeholder: 'Фамилия',
              class: 'input--outbord',
              name: 'second_name', 
              value: second_name
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Телефон</div>
          {%
            Input
            context: {
              placeholder: 'телефон',
              class: 'input--outbord',
              name: 'phone', 
              value: phone
            }
          %}
        </div>

      </div>
      
      <div class="profile__actions profile__actions--center">
        <a href="${CHAT}">
          {% Button 
            context: {
              value: 'Сохранить',
              class: 'form__button'
            }
          %}
        </a>
      </div>
    </div>
    
  </div>
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    Input,
    Button
  }
}
