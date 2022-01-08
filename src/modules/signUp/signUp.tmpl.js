import Button from '../../components/button/button.tmpl'
import Input from '../../components/input/input.tmpl'


const context = {
  value: 'Sign Up'
};

const tmplSignIn =  `
<div >
  <form class="form" >
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">
    {%
      Input
      context: {
        placeholder: 'имя',
        class: 'input--withBord form__input',
        name: 'first_name'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'Фамилия',
        class: 'input--withBord form__input',
        name: 'second_name'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'Логин',
        class: 'input--withBord form__input',
        name: 'login'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'e-mail',
        class: 'input--withBord form__input',
        type: 'email',
        name: 'email'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'телефон',
        class: 'input--withBord form__input',
        type: 'number',
        name: 'phone'
      }
    %}
    {%
      Input
      context: {
        placeholder: 'пароль',
        class: 'input--withBord form__input',
        type: 'password',
        name: 'password'
      }
    %}
      {% Button 
        context: {
          value: '<a href="./">Зарегестрироваться</a>',
          class: 'form__button'
        }
      %}

    </div>
  </form>
  </div>
`


const blockTemplate = function() {
  return `${tmplSignIn}`;
}


export default {
  blockTemplate,
  context,
  children: {
    Button,
    Input
  }
}