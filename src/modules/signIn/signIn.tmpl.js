import Button from '../../components/button/button.tmpl'
import Input from '../../components/input/input.tmpl'


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

      <a href="./">
        {% Button 
          context: {
            value: 'Войти',
            class: 'form__button'
          }
        %}
      </a>
 
      <div class="form__text"><a href="./sign-up">signUp</a></div>
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