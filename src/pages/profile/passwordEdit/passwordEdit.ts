import { Input } from '../../../components/input/input.tmpl';
import { Button } from '../../../components/button/button.tmpl';
import { context } from '../tempContext';
import { CHAT } from '../../../router/namePath';
import { Block } from '../../../core/Block';
import { propsAndChildren } from '../../../core/typeBlock';

const template: string = `<div class="col-lg-12 wrapper-center">
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
        <a href="${CHAT}">
          {% button %}
        </a>
      </div>
    </div>
    
  </div>
  `;

export class PasswordEdit extends Block {
  constructor(props: propsAndChildren) {
    const newProps = { ...context, ...props };
    super(newProps);
  }

  render() {
    return template;
  }
}

export default ()=> (new PasswordEdit({
  inputPassword: new Input({
    placeholder: ' ',
    class: 'input--outbord',
    name: 'oldPassword',
    type: 'password'
  }),
  inputNewPassword: new Input({
    placeholder: ' ',
    class: 'input--outbord',
    name: 'newPassword',
    type: 'password'
  }),
  inputRepeatPassword: new Input({
    placeholder: ' ',
    class: 'input--outbord',
    name: 'newPassword',
    type: 'password'
  }),
  button: new Button({
    value: 'Сохранить',
    class: 'form__button'
  })
}));
