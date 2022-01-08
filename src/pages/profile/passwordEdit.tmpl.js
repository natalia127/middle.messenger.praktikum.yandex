
import Input from '../../components/input/input.tmpl'
import Button from '../../components/button/button.tmpl'
import { context } from './tempContext';

const blockTemplate = function() {

  return `<div class="col-lg-12 wrapperCenter">
    <div class="profile">
      <div class="profile__img"></div>
      <div class="profile__titleName">{{ first_name }}</div>
      <div class="profile__info">
        <div class="profile__item">
          <div class="profile__itemType">Старый пароль</div>
          {%
            Input
            context: {
              placeholder: ' ',
              class: 'input--outbord',
              name: 'oldPassword', 

              type: 'password'
            }
          %}
  
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Новый пароль</div>
          {%
            Input
            context: {
              placeholder: ' ',
              class: 'input--outbord',
              name: 'newPassword', 
              type: 'password'
            }
          %}
        </div>
        <div class="profile__item">
          <div class="profile__itemType">Повторите новый пароль</div>
          {%
            Input
            context: {
              placeholder: ' ',
              class: 'input--outbord',
              name: 'newPassword', 
              type: 'password'
            }
          %}
        </div>



      </div>
      
      <div class="profile__actions profile__actions--center">
        <a href="./">
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
