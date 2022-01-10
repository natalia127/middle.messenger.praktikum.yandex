import Button from '../../components/button/button.tmpl'
import Input from '../../components/input/input.tmpl'
import {SIGNUP, CHAT } from '../../router/namePath'


const context = {
  value: 'Sign In',
};

const tmplSignIn =  `
<div >
  <form class="form" >
    <div class="form__title"> {{value}}</div>
    <div class="form__inputs">

      {% 
        Input
        context: {
          placeholder: 'Логин',
          class: 'input--withBord form__input ',
          name: 'login' 
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
            value: '<a href="${CHAT}">Войти</a>',
            class: 'form__button'
          }
        %}

 
      <div class="form__text"><a href="${SIGNUP}">signUp</a></div>
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