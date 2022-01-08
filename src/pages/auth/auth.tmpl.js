import signIn from '../../modules/signIn/signIn.tmpl'
import signUp from '../../modules/signUp/signUp.tmpl'
import {SIGNIN, SIGNUP} from '../../router/namePath'


const context = {}
let form = ` `
if (location.pathname === SIGNIN) {
  form = `signIn`
} else if (location.pathname === SIGNUP) {
  form = `signUp`
}
const blockTemplate = function() {

  return `<div class="col-lg-12 wrapperCenter">{% ${form} %}</div>
  `;
}

export  default {
  blockTemplate,
  context,
  children: {
    signIn,
    signUp
  }
}
